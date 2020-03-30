(function() {
    
    const maxSliderCount = 1;
    
    function loadSlider() {
        let url = new URL(location.href);
        let id = url.searchParams.get("id");
        if (id === null)
            id = Math.floor(Math.random() * maxSliderCount);
        let script = document.createElement("script");
        script.src = `js/scripts/${id}.js`;
        document.head.appendChild(script);
    }
    
    loadSlider();
    
}());
