// Creado por Jacinto Aisa
const template = document.createElement('template');
template.innerHTML = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

</style>


    <div class="p-3">
      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Leave a comment here" id="titleTextArea" style="height: 100px"></textarea>
        <label for="titleTextArea">Introduzca la frase o palabra que desee comprobar</label>
      </div>

      <div class="d-flex gap-2">
        <span class="badge bg-success">Word Count: <span class="word-count">0</span></span>
        <span class="badge bg-secondary">Letter Count: <span class="letter-count">0</span></span>
      </div>
  </div


`;

class TextAnalyzer extends HTMLElement {
  static get observedAttributes() { return ['text']; }
  
  constructor() {
    super();
    this._text = '';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.$textarea = this.shadowRoot.querySelector('.form-control');
    this.$wordCount = this.shadowRoot.querySelector('.word-count');
    this.$letterCount = this.shadowRoot.querySelector('.letter-count');
    
    this._onInput = this._onInput.bind(this);
  }
  
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this.text = this.getAttribute('text');
    }
    this.$textarea.addEventListener('input', this._onInput);
    // ensure initial counts are correct
    this._updateCounts();
  }
  
  disconnectedCallback() {
    this.$textarea.removeEventListener('input', this._onInput);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text' && newValue !== oldValue) {
      this.text = newValue || '';
    }
  }
  
  get text() { return this._text; }
  set text(value) {
    const normalized = value == null ? '' : String(value);
    if (normalized === this._text) return;
    this._text = normalized;
    if (this.$textarea && this.$textarea.value !== normalized) {
      this.$textarea.value = normalized;
    }
    this._updateCounts();
    // reflect to attribute for consistency (but avoid infinite loop)
    if (this.getAttribute('text') !== normalized) {
      this.setAttribute('text', normalized);
    }
  }
  
  _onInput(e) {
    this._text = e.target.value;
    // reflect attribute (keeps property/attr in sync)
    if (this.getAttribute('text') !== this._text) {
      this.setAttribute('text', this._text);
    }
    this._updateCounts();
    this.dispatchEvent(new CustomEvent('text-change', { detail: { text: this._text } }));
  }
  
  _updateCounts() {
    const text = this._text || '';
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    if (this.$wordCount) this.$wordCount.textContent = String(wordCount);
    if (this.$letterCount) this.$letterCount.textContent = String(letterCount);
  }
}

customElements.define('text-analyzer', TextAnalyzer);

export default TextAnalyzer;
