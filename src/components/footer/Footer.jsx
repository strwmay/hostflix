import "./Footer.css";

const Footer = (props) => {
    return (
      <footer>
        <p>feito com ❤︎‬ por <a href={props.devLink}>{props.devName}</a></p>
      </footer>
    )
  }
  
  export default Footer;