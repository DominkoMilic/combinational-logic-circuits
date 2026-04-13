function InfoBlock() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        Welcome to Combinational Logical Circuit app!
      </h1>
      <div className="text-gray-200 leading-relaxed">
        This web application is part of my Bachelor's degree project at the
        Faculty of Electrical Engineering, Mechanical Engineering and Naval
        Architecture (FESB), University of Split, Croatia.
        <br /><br />
        If you encounter any bugs, issues, or have suggestions, please don't
        hesitate to reach out. Your feedback is valuable!
        <br /><br />
        Contact me:{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&to=dominkomilic@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          dominkomilic@gmail.com
        </a>
        <br />
        Download my thesis{" "}
        <a
          href="/Završni_rad_Dominko_Milić_-_Simulacija_digitalnih_sklopova_koristenjem_React_js-e17da7b1b1.pdf"
          download
          className="text-blue-400 hover:text-blue-300 underline"
        >
          here
        </a>
        <br />
        View my work on GitHub:{" "}
        <a
          href="https://github.com/DominkoMilic?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          DominkoMilic
        </a>
        <br /><br />
        Thank you for checking out my project!
      </div>
    </div>
  );
}

export default InfoBlock;
