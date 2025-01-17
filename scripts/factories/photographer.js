function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait  } = data;
    const picture = `assets/photographers/${portrait}`;

    // crée l'affiche d'un photographe avec sa photo et ses information
    // create the article of the photograph with its picture and its details
    function getUserCardDOM() {
        const article = document.createElement( "article" );
        
        const a = document.createElement("a");
        a.setAttribute( "href" , "photographer.html?id=" + id );
        a.setAttribute( "aria-label" , name);

        const img = document.createElement( "img" );
        img.setAttribute( "src" , picture);
        img.setAttribute( "alt" , "photo de " + name);

        const h2 = document.createElement( "h2" );
        h2.textContent = name;

        const h3 = document.createElement( "h3" );
        h3.textContent = city + ", " + country;

        const h4 = document.createElement( "h4" );
        h4.textContent = tagline;

        const p = document.createElement( "p" );
        p.textContent = price + "/jour"
        
        article.appendChild(a);

        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h3);
        a.appendChild(h4);
        a.appendChild(p);
        return (article);
    }

    // crée le bandeau avec les informations du photographe pour la page photographe
    // create the header with the details of the photograph for the photograph page
    function getUserHeaderCardDOM(){
        const article = document.createElement( "article" );
        
        const detail = document.createElement( "div" );
        detail.classList= "photograph_detail";

        const h1 = document.createElement("h1");
        h1.textContent = name;

        const h2 = document.createElement("h2");
        h2.textContent = city + ", " + country;

        const p = document.createElement( "p" );
        p.textContent = tagline;

        detail.appendChild(h1);
        detail.appendChild(h2);
        detail.appendChild(p);

        const img = document.createElement( "img" );
        img.setAttribute( "src" , picture);
        img.setAttribute( "alt" , "photo de " + name);

        article.appendChild(detail);
        article.appendChild(img);

        return (article);
    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM ,getUserHeaderCardDOM}
}