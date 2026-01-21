// Minimal jQuery-like implementation for this app
var jQuery = $ = function(selector) {
    if (typeof selector === 'function') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', selector);
        } else {
            selector();
        }
        return;
    }
    
    var elements = [];
    if (typeof selector === 'string') {
        elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof Element) {
        elements = [selector];
    }
    
    var obj = {
        length: elements.length,
        
        each: function(fn) {
            elements.forEach(fn);
            return this;
        },
        
        on: function(event, handler) {
            elements.forEach(el => el.addEventListener(event, handler));
            return this;
        },
        
        off: function(event, handler) {
            elements.forEach(el => el.removeEventListener(event, handler));
            return this;
        },
        
        val: function(value) {
            if (value === undefined) {
                return elements[0] ? elements[0].value : '';
            }
            elements.forEach(el => el.value = value);
            return this;
        },
        
        text: function(text) {
            if (text === undefined) {
                return elements[0] ? elements[0].textContent : '';
            }
            elements.forEach(el => el.textContent = text);
            return this;
        },
        
        html: function(html) {
            if (html === undefined) {
                return elements[0] ? elements[0].innerHTML : '';
            }
            elements.forEach(el => el.innerHTML = html);
            return this;
        },
        
        append: function(html) {
            elements.forEach(el => el.insertAdjacentHTML('beforeend', html));
            return this;
        },
        
        empty: function() {
            elements.forEach(el => el.innerHTML = '');
            return this;
        },
        
        hide: function() {
            elements.forEach(el => el.style.display = 'none');
            return this;
        },
        
        show: function() {
            elements.forEach(el => el.style.display = '');
            return this;
        },
        
        addClass: function(className) {
            elements.forEach(el => el.classList.add(className));
            return this;
        },
        
        removeClass: function(className) {
            elements.forEach(el => el.classList.remove(className));
            return this;
        },
        
        data: function(key, value) {
            if (value === undefined) {
                return elements[0] ? elements[0].dataset[key] : undefined;
            }
            elements.forEach(el => el.dataset[key] = value);
            return this;
        },
        
        find: function(selector) {
            var found = [];
            elements.forEach(el => {
                found.push(...el.querySelectorAll(selector));
            });
            return $(found);
        }
    };
    
    elements.forEach((el, i) => {
        obj[i] = el;
    });
    
    return obj;
};
