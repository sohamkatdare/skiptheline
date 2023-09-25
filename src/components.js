class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback()  {
    this.innerHTML = `
       <nav class="navbar bg-primary sticky top-0 text-primary-content">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl" href="/index.html"
            >Skip The Line</a
          >
        </div>

        </slot>
        
        
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li><a class="hover" href="/stuco/">StuCo</a></li>
            <li><a class="hover" href="/deli/">Deli</a></li>
            <li><a class="hover" href="/grab-and-go/">Grab & GoCo</a></li>
          </ul>
        </div>
      </nav>
      <div class="spot -translate-y-[3.25rem]"></div>
    `;
  }
}

customElements.define('navbar-component', Navbar); 

