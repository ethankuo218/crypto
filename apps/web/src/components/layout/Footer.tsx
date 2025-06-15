import logo from '../../assets/logo.svg';

const Footer: React.FC = () => (
  <footer className="bg-[#141416]">
    <div className="max-w-[1440px] mx-auto px-8 py-12 flex flex-col md:flex-row justify-between gap-12 border-b border-[#23242A]">
      {/* Left Section */}
      <div className="flex flex-col gap-6 min-w-[250px]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Crypto Logo" className="w-12 h-12" />
          <span className="text-text-primary text-3xl font-bold">Crypto</span>
        </div>

        <div className="text-text-primary flex flex-col gap-3">
          <p className="text-2xl font-bold">
            Let's talk!{' '}
            <span role="img" aria-label="waving hand">
              🤙
            </span>
          </p>
          <p>+98 902 353 2926</p>
          <p>ehankuo0218@gmail.com</p>
          <p>Free For All Of The World People</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="flex flex-1 justify-between flex-wrap gap-8">
        <div>
          <h4 className="font-bold mb-3 tracking-widest text-text-primary">PRODUCTS</h4>
          <ul className="space-y-2 text-text-secondary">
            <li>Spot</li>
            <li>Inverse Perpetual</li>
            <li>USDT Perpetual</li>
            <li>Exchange</li>
            <li>Launchpad</li>
            <li>Binance Pay</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 tracking-widest text-text-primary">SERVICES</h4>
          <ul className="space-y-2 text-text-secondary">
            <li>Buy Crypto</li>
            <li>Markets</li>
            <li>Tranding Fee</li>
            <li>Affiliate Program</li>
            <li>Referral Program</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 tracking-widest text-text-primary">SUPPORT</h4>
          <ul className="space-y-2 text-text-secondary">
            <li>Bybit Learn</li>
            <li>Help Center</li>
            <li>User Feedback</li>
            <li>Submit A Request</li>
            <li>API Documentation</li>
            <li>Trading Rules</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 tracking-widest text-text-primary">ABOUT US</h4>
          <ul className="space-y-2 text-text-secondary">
            <li>About Bybit</li>
            <li>Authenticity Check</li>
            <li>Careers</li>
            <li>Business Contacts</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-[#23242A] py-4 px-8 flex justify-center mx-auto">
      <div className="flex justify-between w-full max-w-[1440px]">
        <span className="text-text-secondary text-sm">
          Copyright © 2025 Free For All Of The World People
        </span>
        <div className="flex gap-4 mt-2 md:mt-0">
          {/* Replace # with your social links */}
          <a href="#" aria-label="Facebook">
            <svg
              className="w-6 h-6 text-text-secondary hover:text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg
              className="w-6 h-6 text-text-secondary hover:text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg
              className="w-6 h-6 text-text-secondary hover:text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.334 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.06 1.282.354 2.394 1.334 3.374.98.98 2.092 1.274 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.06 2.394-.354 3.374-1.334.98-.98 1.274-2.092 1.334-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.06-1.282-.354-2.394-1.334-3.374-.98-.98-2.092-1.274-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg
              className="w-6 h-6 text-text-secondary hover:text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
