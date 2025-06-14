import { useTheme } from '../../scripts/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const About: React.FC = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col" 
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

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold"
              style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
            About My Application
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto"
             style={{ color: darkMode ? '#ffffff' : '#000000' }}>
            Welcome to the Image to PDF Converter! My application allows you to seamlessly transform your images into high-quality PDF documents with just a few clicks.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-3xl font-semibold"
              style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
            Contact Me
          </h2>
          <p className="text-lg opacity-80"
             style={{ color: darkMode ? '#ffffff' : '#000000' }}>
            If you have any questions, feedback, or need assistance, feel free to reach out to us:
          </p>
          <ul className="list-disc list-inside space-y-2"> 
            <li className="text-lg"
                style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Email: <a href="mailto:stcom" className="underline"
                         style={{ color: darkMode ? '#ff0000' : '#007bff' }}>stanleygersom@gmail.com</a>
            </li>
          </ul>
          
          <div className="flex justify-center space-x-6 mt-6">
            <a href="https://github.com/ACT91" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-3xl hover:opacity-80 transition-opacity"
               style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              <FontAwesomeIcon icon={faGithub} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/stanley-gersom-623b272a5/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-3xl hover:opacity-80 transition-opacity"
               style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              <FontAwesomeIcon icon={faLinkedin} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center mt-auto"
              style={{ backgroundColor: darkMode ? '#1a1a1a' : '#f3f4f6', color: darkMode ? '#ffffff' : '#000000' }}>
        <p>&copy; {new Date().getFullYear()} Image to PDF Converter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;