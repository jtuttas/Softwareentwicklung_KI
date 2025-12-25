// Minimal Bootstrap Modal implementation
var bootstrap = {
    Modal: function(element) {
        this.element = element;
        this._backdrop = null;
        
        this.show = () => {
            element.classList.add('show');
            element.style.display = 'block';
            element.setAttribute('aria-modal', 'true');
            element.removeAttribute('aria-hidden');
            
            if (!this._backdrop) {
                this._backdrop = document.createElement('div');
                this._backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(this._backdrop);
            }
            
            document.body.classList.add('modal-open');
        };
        
        this.hide = () => {
            element.classList.remove('show');
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
            element.removeAttribute('aria-modal');
            
            if (this._backdrop) {
                this._backdrop.remove();
                this._backdrop = null;
            }
            
            document.body.classList.remove('modal-open');
        };
        
        // Close modal when clicking close button or backdrop
        element.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', () => this.hide());
        });
        
        element.addEventListener('click', (e) => {
            if (e.target === element) {
                this.hide();
            }
        });
    }
};
