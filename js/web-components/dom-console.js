var DomConsole = (function(){
	function create(){
		var domConsole = {};
		domConsole.dom = {};
		bind(domConsole);
		return domConsole;
	}
	function bind(domConsole){
		domConsole.gatherSelectors = gatherSelectors.bind(domConsole);
	}
	function gatherSelectors(){
		//this.dom.shadowRoot = this.el.createShadowRoot();
	}
	return {
		create : create
	};
})();