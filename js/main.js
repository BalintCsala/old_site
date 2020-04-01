(function() {
    
    const MAX_SLIDER_COUNT = 2;
    
    function loadSlider() {
        let url = new URL(location.href);
        let id = url.searchParams.get("id");
        if (id === null)
            id = Math.floor(Math.random() * MAX_SLIDER_COUNT);
        id = Math.min(Math.max(id, 0), MAX_SLIDER_COUNT - 1);
        let script = document.createElement("script");
        script.src = `js/scripts/${id}.js`;
        document.head.appendChild(script);
    }
    
    loadSlider();
    
}());
