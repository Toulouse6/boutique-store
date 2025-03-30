import{e as I,f as k,g as z,h as F,i as j}from"./chunk-7PHZ24IL.js";import{$a as l,Ba as o,Ca as s,Jb as S,Kb as T,Nb as E,Pa as C,Ra as c,Ua as e,Va as n,Wa as m,Xa as h,Ya as M,Za as O,_a as b,aa as f,gb as v,hb as r,ia as u,ib as _,ja as x,jb as d,ob as w,tb as y,xa as P}from"./chunk-VSGJTDVG.js";function q(i,g){if(i&1&&(e(0,"tr")(1,"td"),m(2,"img",9),n(),e(3,"td"),r(4),n(),e(5,"td"),r(6),n(),e(7,"td"),r(8),n(),e(9,"td"),r(10),n()()),i&2){let t=g.$implicit,a=l(2);o(2),c("src",a.productService.getImageUrl(t.product.images[0]==null?null:t.product.images[0].url),P),o(2),_(t.product.title),o(2),_(t.quantity),o(2),d("$",t.product.min_price,""),o(2),d("$",t.product.min_price*t.quantity,"")}}function A(i,g){if(i&1){let t=O();h(0),e(1,"div",3)(2,"table",4)(3,"thead")(4,"tr")(5,"th"),r(6,"Preview"),n(),e(7,"th"),r(8,"Item"),n(),e(9,"th"),r(10,"Qt."),n(),e(11,"th"),r(12,"Price"),n(),e(13,"th"),r(14,"Total"),n()()(),e(15,"tbody"),C(16,q,11,5,"tr",5),n()()(),e(17,"div",6)(18,"strong"),r(19),n()(),e(20,"div",7)(21,"button",8),b("click",function(){u(t);let p=l();return x(p.clearCart())}),r(22," Clear Cart "),n()(),M()}if(i&2){let t=l();o(16),c("ngForOf",t.cartItems),o(3),d("$",t.getTotal(),"")}}function V(i,g){i&1&&(e(0,"p",10),r(1,"Your cart is empty..."),n(),m(2,"img",11))}var Y=(()=>{class i{constructor(t,a){this.cartService=t,this.productService=a,this.cartItems=this.cartService.getCart()}clearCart(){confirm("Are you sure?")&&(this.cartService.clearCart(),this.cartItems=[])}getTotal(){return this.cartItems.reduce((t,a)=>t+a.product.min_price*a.quantity,0)}static{this.\u0275fac=function(a){return new(a||i)(s(j),s(I))}}static{this.\u0275cmp=f({type:i,selectors:[["app-cart-page"]],standalone:!0,features:[w],decls:5,vars:2,consts:[["emptyCart",""],[1,"cartPage"],[4,"ngIf","ngIfElse"],[1,"tableWrapper"],[1,"cartTable"],[4,"ngFor","ngForOf"],[1,"cartTotal"],[1,"cartActions"],["mat-stroked-button","","color","primary",1,"clear-cart-button",3,"click"],["alt","product image",3,"src"],[1,"emptyCart"],["src","./assets/images/cart.png","alt","Cart",1,"cart-icon"]],template:function(a,p){if(a&1&&(m(0,"app-header"),e(1,"div",1),C(2,A,23,2,"ng-container",2)(3,V,3,0,"ng-template",null,0,y),n()),a&2){let $=v(4);o(2),c("ngIf",p.cartItems.length>0)("ngIfElse",$)}},dependencies:[k,E,S,T,F,z],styles:[".cartPage[_ngcontent-%COMP%]{width:100%;max-height:100dvh;margin-top:2rem;padding:0 6rem;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;overflow:hidden}.tableWrapper[_ngcontent-%COMP%]{width:100%;position:relative;overflow-x:auto;-webkit-overflow-scrolling:touch}.cartTable[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}.cartTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f9f9f9}.cartTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .cartTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:1rem;border:1px solid #d6d6d6;text-align:center;white-space:nowrap}.cartTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f7f7f7}.cartTable[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:4px;width:50px;height:auto}.cartTotal[_ngcontent-%COMP%]{width:98%;text-align:center;justify-content:flex-end;display:flex;font-size:1.8rem;font-weight:500;margin-top:2rem}.cartActions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;margin-top:1rem}.clear-cart-button[_ngcontent-%COMP%]{background-color:#3856727a;font-weight:400;color:#edfbfe!important;border:none}.clear-cart-button[_ngcontent-%COMP%]:hover{background-color:#3856723b;color:#fff!important}.emptyCart[_ngcontent-%COMP%]{margin-top:3rem;font-size:1.6rem}.cart-icon[_ngcontent-%COMP%]{margin-top:1rem;width:70px;height:70px}@media (max-width: 1400px){.cartPage[_ngcontent-%COMP%]{padding:0 4rem;margin-top:1.8rem}}@media (max-width: 1024px){.cartPage[_ngcontent-%COMP%]{margin-top:1.2rem;padding:0 3rem}}@media (max-width: 780px){.cartPage[_ngcontent-%COMP%]{margin-top:1rem;padding:0 1rem}.cartTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .cartTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.4rem;font-size:.75rem}.cartTable[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:36px}.cartTotal[_ngcontent-%COMP%]{font-size:1.2rem}.emptyCart[_ngcontent-%COMP%]{margin-top:5rem;font-size:1.2rem}.cart-icon[_ngcontent-%COMP%]{width:70px;height:70px}}@media (max-width: 430px){.cartPage[_ngcontent-%COMP%]{margin-top:0;padding:0 .5rem}.cartTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .cartTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.3rem;font-size:.7rem}.cartTable[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px}}"]})}}return i})();export{Y as CartPageComponent};
