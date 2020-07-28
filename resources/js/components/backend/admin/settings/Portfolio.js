class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      links: [
        "http://kiraburova.github.io/ModernLook/",
        "http://kiraburova.github.io/passion/",
        "http://kiraburova.github.io/singolo/",
        "https://kiraburova.github.io/Kafeinate/"
      ],

      images: [
        "https://image.ibb.co/chE8xv/1.png",
        "https://image.ibb.co/kR9K4a/2.png",
        "https://image.ibb.co/n9niVF/3.png",
        "https://image.ibb.co/i3PVAF/4.png"
      ]
    };
  }
  render() {
    const { links, images } = this.state;
    let gallery = links.map((href, i) => {
      return (
        <a className="gallery__item" href={href} target="_blank">
          <img className="gallery__img" src={images[i]} />
        </a>
      );
    });
    return <div className="gallery" id="Portfolio">{gallery}</div>;
  }
}

export default Portfolio