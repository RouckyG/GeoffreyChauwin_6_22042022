function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait  } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( "article" );

        const a = document.createElement("a");
        a.setAttribute( "href" , "photographer.html?id=" + id );

        const img = document.createElement( "img" );
        img.setAttribute( "src" , picture);
        img.setAttribute( "alt" , "photo de " + name);

        const h2 = document.createElement( "h2" );
        h2.textContent = name;
        h2.setAttribute( "aria-label" , name);

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

    function getUserHeaderCardDOM(){
        const article = document.createElement( "article" );
        
        const h1 = document.createElement("h1");
        h1.textContent = name;

        const h2 = document.createElement("h2");
        h2.textContent = city + ", " + country;

        const p = document.createElement( "p" );
        p.textContent = tagline;

        article.appendChild(h1);
        article.appendChild(h2);
        article.appendChild(p);

        return (article);
    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM ,getUserHeaderCardDOM}
}