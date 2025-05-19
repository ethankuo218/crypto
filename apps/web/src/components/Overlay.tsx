interface OverlayProps {
  isActive: boolean;
  onClick: () => void;
}

export const Overlay = ({ isActive, onClick }: OverlayProps) => {
  return (
    <div
      aria-hidden={!isActive}
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-45 ${
        isActive ? 'opacity-50' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClick}
    />
  );
};
