import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from './types';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface SSEClientOptions {
  onInitial?: (data: any) => void;
  onMessage: (data: any) => void;
  onError?: (error: Error | Event) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: Event) => void;
  headers?: Record<string, string>;
}

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private sseConnections: Map<string, EventSource>;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.sseConnections = new Map();
    this.setupInterceptors();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        // You can add common headers here (e.g., authentication tokens)
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => response.data,
      error => Promise.reject(this.handleError(error))
    );
  }

  private handleError(error: AxiosError): ApiError {
    console.error('HTTP Client Error:', error);

    if (error.response) {
      // Server responded with a status code out of 2xx range
      const serverData = error.response.data as { message?: string; code?: string };
      return {
        message: serverData?.message || error.message || 'An error occurred on the server.',
        status: error.response.status,
        code: serverData?.code,
      };
    }

    if (error.request) {
      // Request was made but no response was received
      return {
        message: 'No response from server. Check network connection or server status.',
        status: 0,
      };
    }

    // Something happened in setting up the request
    return {
      message: error.message || 'An unexpected error occurred.',
      status: 0,
    };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response as T;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response as T;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response as T;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response as T;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response as T;
  }

  public subscribeToSSE(url: string, options: SSEClientOptions): () => void {
    this.closeSSEConnection(url);
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
    const eventSource = new EventSource(fullUrl);

    // Handle initial data
    eventSource.addEventListener('initial', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (options.onInitial) {
          options.onInitial(data);
        }
      } catch (error) {}
    });

    // Handle message updates
    eventSource.addEventListener('message', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        options.onMessage(data);
      } catch (error) {}
    });

    // Handle connection errors
    eventSource.onerror = event => {
      if (options.onError) {
        options.onError(event);
      }
    };

    this.sseConnections.set(url, eventSource);
    return () => {
      if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }
      this.sseConnections.delete(url);
    };
  }

  public closeSSEConnection(url: string): void {
    const connection = this.sseConnections.get(url);
    if (connection) {
      connection.close();
      this.sseConnections.delete(url);
    }
  }

  public closeAllSSEConnections(): void {
    this.sseConnections.forEach(connection => connection.close());
    this.sseConnections.clear();
  }
}

export const httpClient = HttpClient.getInstance();
