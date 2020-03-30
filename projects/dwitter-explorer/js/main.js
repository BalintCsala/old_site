(async function() {
    
    let leftArrow = document.getElementById("left-arrow");
    let rightArrow = document.getElementById("right-arrow");
    let backCounter = document.getElementById("back-counter");
    let forwardCounter = document.getElementById("forward-counter");
    let currentCounter = document.getElementById("current-counter");
    let container = document.getElementById("container");
    let page = document.getElementById("page");
    let jumpButton = document.getElementById("jump");
    let jumpIndex = document.getElementById("jump-index");
    
    let last = await fetch("https://www.dwitter.net/api/dweets/?limit=1");
    let lastResponse = await last.json();
    let lastId = lastResponse.results[0].id;
    
    let currentTop = lastId;
    
    let cache = {};
    let treeCache = {};
    
    leftArrow.addEventListener("click", () => {
        currentTop += parseInt(page.value) + 1;
        currentTop = Math.min(currentTop, lastId);
        load();
    });
    
    rightArrow.addEventListener("click", () => {
        currentTop -= parseInt(page.value) + 1;
        currentTop = Math.max(currentTop, 0);
        load();
    });
    
    page.addEventListener("input", load);
    
    jumpButton.addEventListener("click", () => {
        currentTop = Math.max(Math.min(parseInt(jumpIndex.value), lastId), 0);
        load();
    }); 
    
    async function load() {
        container.innerHTML = "";
        
        backCounter.innerHTML = `${Math.min(currentTop + parseInt(page.value) + 1, lastId)} - ${Math.min(currentTop + parseInt(page.value) + 1, lastId) - parseInt(page.value)}`;
        forwardCounter.innerHTML = `${Math.max(currentTop - parseInt(page.value) - 1, 0)} - ${Math.max(currentTop - parseInt(page.value) - 1, 0) - parseInt(page.value)}`;
        currentCounter.innerHTML = `${currentTop} - ${currentTop - parseInt(page.value)}`;
        
        
        let offsetY = 0;
        
        for (let i = currentTop; i >= Math.max(currentTop - parseInt(page.value), 0); i--) {
            let currentDweet = await getDweet(i);
            let rootDweet = await findRoot(currentDweet);
            let tree = { deleted: rootDweet.deleted, id: rootDweet.data.id, children: await scanTree(rootDweet) };
            treeCache[rootDweet.data.id] = tree.children;
            
            let height = getTreeHeight(tree);
            let canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = height;
            canvas.style.width = "800px";
            canvas.style.height = height + "px";
            canvas.style.position = "absolute";
            canvas.style.left = "0px";
            canvas.style.top = offsetY + "px";
            let ctx = canvas.getContext("2d");
            
            ctx.beginPath();
            let elements = recurse(tree, currentDweet, 0, offsetY, offsetY, ctx);
            ctx.stroke();
            container.appendChild(canvas);
            for (let element of elements) {
                container.appendChild(element);
            }
            offsetY += height + 10;
        }
    }
    
    function getTreeHeight(tree) {
        let height = 0;
        if (tree.children.length == 0)
            return 16;
        for (let child of tree.children) {
            height += getTreeHeight(child);
        }
        return height;
    }
    
    function recurse(tree, currentDweet, offsetX, offsetY, baseOffsetY, ctx) {
        let elements = [ createDweetElement(tree, currentDweet, offsetX, offsetY) ];
        let rootOffX = offsetX;
        let rootOffY = offsetY;
        for (let child of tree.children) {
            ctx.moveTo(rootOffX + 10, rootOffY - baseOffsetY + 10);
            ctx.lineTo(offsetX + 26, offsetY - baseOffsetY + 10);
            elements.push(...recurse(child, currentDweet, offsetX + 16, offsetY, baseOffsetY, ctx));
            offsetY += getTreeHeight(child);
        }
        return elements;
    }
    
    async function getDweet(id) {
        let dweet = await fetch("https://www.dwitter.net/api/dweets/" + id);
        let dweetJson = await dweet.json();
        return {
            deleted: dweetJson.detail != null,
            data: dweetJson
        };
    }
    
    async function findRoot(dweet) {
        if (cache[dweet.data.id] != null)
            return cache[dweet.data.id];
        let ids = [ dweet.data.id ];
        if (dweet.deleted) {
            return dweet;
        } else {
            while (!dweet.deleted && dweet.data.remix_of != null) {
                let newDweet = await getDweet(dweet.data.remix_of);
                if (newDweet.deleted)
                    break;
                    ids.push(newDweet.data.id);
                dweet = newDweet;
            }
        }
        for (let id of ids) {
            cache[id] = dweet;
        }
        return dweet;
    }
    
    function createDweetElement(dweet, currentDweet, offsetX, offsetY) {
        let element = document.createElement("div");
        element.classList.add("dweet");
        if (dweet.deleted) {
            element.classList.add("deleted");
        } else if (dweet.id == currentDweet.data.id) {
            element.classList.add("current");
        }
        element.style.left = offsetX + "px";
        element.style.top = offsetY + "px";
        
        let description = document.createElement("div");
        description.classList.add("dweet-description");
        description.innerHTML = `id: ${dweet.id}<br />${dweet.deleted ? "deleted" : ""}`;
        element.appendChild(description);
        return element;
    }
    
    async function scanTree(root) {
        if (treeCache[root.data.id] != null)
            return treeCache[root.data.id];
        let remixes = await fetch("https://www.dwitter.net/api/dweets/?remix_of=" + root.data.id);
        let remixesJson = await remixes.json();
        if (remixesJson.count == 0) {
            return [];
        } else {
            let children = [];
            for (let result of remixesJson.results) {
                let childDweet = await getDweet(result.id);
                let child = { deleted: childDweet.deleted, id: result.id, children: await scanTree(childDweet) };
                children.push(child);
            }
            return children;
        }
    }
    
    load();
        
}());
