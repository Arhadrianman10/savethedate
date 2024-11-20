export default function BackgroundContainer({ children }) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    );
  }
  