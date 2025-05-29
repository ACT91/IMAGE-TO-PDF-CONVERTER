import { useTheme } from '../../scripts/ThemeProvider';

const About: React.FC = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen" 
         style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}>
      <header className="navbar"
              style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}>
        <div className="flex-1">
          <span className="text-2xl font-bold">
            <span style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              IMAGE TO PDF
            </span>{" "}
            <span style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              CONVERTER
            </span>
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold"
              style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
            About Our Application
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto"
             style={{ color: darkMode ? '#ffffff' : '#000000' }}>
            Welcome to the Image to PDF Converter! Our application allows you to seamlessly transform your images into high-quality PDF documents with just a few clicks.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-3xl font-semibold"
              style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
            Contact Us
          </h2>
          <p className="text-lg opacity-80"
             style={{ color: darkMode ? '#ffffff' : '#000000' }}>
            If you have any questions, feedback, or need assistance, feel free to reach out to us:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg"
                style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Email: <a href="mailto:support@imagetopdf.com" className="underline"
                         style={{ color: darkMode ? '#ff0000' : '#007bff' }}>support@imagetopdf.com</a>
            </li>
            <li className="text-lg"
                style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Phone: <a href="tel:+1234567890" className="underline"
                         style={{ color: darkMode ? '#ff0000' : '#007bff' }}>+1 (234) 567-890</a>
            </li>
            <li className="text-lg"
                style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Address: 123 PDF Lane, Converter City, World
            </li>
          </ul>
        </div>
      </main>

      <footer className="py-4 text-center"
              style={{ backgroundColor: darkMode ? '#1a1a1a' : '#f3f4f6', color: darkMode ? '#ffffff' : '#000000' }}>
        <p>&copy; 2025 Image to PDF Converter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;