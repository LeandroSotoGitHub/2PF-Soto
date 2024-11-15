"use strict";(self.webpackChunk_1PF_Soto=self.webpackChunk_1PF_Soto||[]).push([[411],{2411:(M,h,i)=>{i.r(h),i.d(h,{AuthModule:()=>$});var f=i(177),c=i(5743),s=i(9417),k=i(2092),u=i(5177),t=i(7705),d=i(6764),g=i(8834),F=i(9213),n=i(6467),E=i(9631),m=i(5596);function b(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("firstName"))}}function C(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("lastName"))}}function R(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("email"))}}function v(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("password"))}}function j(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("email"))}}function T(r,l){if(1&r&&(t.j41(0,"mat-error"),t.EFF(1),t.k0s()),2&r){const e=t.XpG();t.R7$(1),t.JRh(e.getErrorMessage("password"))}}const y=[{path:"register",component:(()=>{class r{constructor(e,o,a){this.fb=e,this.router=o,this.authService=a,this.registerForm=e.group({email:["",[s.k0.required,s.k0.email]],password:["",[s.k0.required]],role:["user",s.k0.required],firstName:["",s.k0.required],lastName:["",s.k0.required]})}onSubmit(){if(this.registerForm.invalid)this.registerForm.markAllAsTouched();else{const e={...this.registerForm.value,token:(0,k.H)(20)};this.authService.register(e).subscribe({next:o=>{console.log("Registro exitoso con token:",o),this.router.navigate(["/auth/login"])},error:o=>{console.error(o),o instanceof Error&&alert(o.message)}})}}getErrorMessage(e){return u.F.getErrorMessage(this.registerForm,e)}hasError(e){return u.F.hasError(this.registerForm,e)}toLogin(){this.router.navigate(["/auth/login"])}static{this.\u0275fac=function(o){return new(o||r)(t.rXU(s.ok),t.rXU(c.Ix),t.rXU(d.u))}}static{this.\u0275cmp=t.VBU({type:r,selectors:[["app-register"]],decls:38,vars:5,consts:[[1,"mb-3"],[3,"formGroup"],["appearance","outline",1,"w-100"],["matInput","","placeholder","Nombre","formControlName","firstName"],["matSuffix",""],[4,"ngIf"],["matInput","","placeholder","Apellido","formControlName","lastName"],["matInput","","placeholder","example@example.com","formControlName","email"],["matInput","","placeholder","Contrase\xf1a","formControlName","password"],["mat-card-actions",""],["mat-raised-button","",1,"w-25","m-3",3,"click"],["mat-raised-button","",1,"w-25",3,"click"]],template:function(o,a){1&o&&(t.j41(0,"mat-card-header",0)(1,"mat-card-title"),t.EFF(2,"Crear Usuario"),t.k0s()(),t.j41(3,"mat-card-content")(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t.EFF(7,"Nombre"),t.k0s(),t.nrm(8,"input",3),t.j41(9,"mat-icon",4),t.EFF(10,"person"),t.k0s(),t.DNE(11,b,2,1,"mat-error",5),t.k0s(),t.j41(12,"mat-form-field",2)(13,"mat-label"),t.EFF(14,"Apellido"),t.k0s(),t.nrm(15,"input",6),t.j41(16,"mat-icon",4),t.EFF(17,"person"),t.k0s(),t.DNE(18,C,2,1,"mat-error",5),t.k0s(),t.j41(19,"mat-form-field",2)(20,"mat-label"),t.EFF(21,"E-mail"),t.k0s(),t.nrm(22,"input",7),t.j41(23,"mat-icon",4),t.EFF(24,"email"),t.k0s(),t.DNE(25,R,2,1,"mat-error",5),t.k0s(),t.j41(26,"mat-form-field",2)(27,"mat-label"),t.EFF(28,"Contrase\xf1a"),t.k0s(),t.nrm(29,"input",8),t.j41(30,"mat-icon",4),t.EFF(31,"key"),t.k0s(),t.DNE(32,v,2,1,"mat-error",5),t.k0s()()(),t.j41(33,"div",9)(34,"button",10),t.bIt("click",function(){return a.onSubmit()}),t.EFF(35,"Validar"),t.k0s(),t.j41(36,"button",11),t.bIt("click",function(){return a.toLogin()}),t.EFF(37,"Iniciar sesi\xf3n"),t.k0s()()),2&o&&(t.R7$(4),t.Y8G("formGroup",a.registerForm),t.R7$(7),t.Y8G("ngIf",a.hasError("firstName")),t.R7$(7),t.Y8G("ngIf",a.hasError("lastName")),t.R7$(7),t.Y8G("ngIf",a.hasError("email")),t.R7$(7),t.Y8G("ngIf",a.hasError("password")))},dependencies:[f.bT,g.$z,F.An,n.rl,n.nJ,n.TL,n.yw,s.qT,s.me,s.BC,s.cb,s.j4,s.JD,E.fg,m.m2,m.MM,m.dh]})}}return r})()},{path:"login",component:(()=>{class r{constructor(e,o,a){this.router=e,this.fb=o,this.authService=a,this.passwordInputType="password",this.loginForm=o.group({email:["",[s.k0.required,s.k0.email]],password:["",[s.k0.required]]})}onSubmit(){this.loginForm.invalid?this.loginForm.markAllAsTouched():this.authService.login(this.loginForm.value).subscribe({next:()=>{this.router.navigate(["dashboard","home"])},error:e=>{console.error(e),e instanceof Error&&alert(e.message)}})}toggleInputType(){this.passwordInputType="password"===this.passwordInputType?"text":"password"}getErrorMessage(e){return u.F.getErrorMessage(this.loginForm,e)}hasError(e){return u.F.hasError(this.loginForm,e)}toRegister(){this.router.navigate(["/auth/register"])}static{this.\u0275fac=function(o){return new(o||r)(t.rXU(c.Ix),t.rXU(s.ok),t.rXU(d.u))}}static{this.\u0275cmp=t.VBU({type:r,selectors:[["app-login"]],decls:25,vars:4,consts:[[1,"mb-3"],[3,"formGroup"],["appearance","outline",1,"w-100"],["matInput","","placeholder","Usuario","formControlName","email"],["matSuffix",""],[4,"ngIf"],["matInput","","placeholder","Contrase\xf1a","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["mat-card-actions",""],["mat-raised-button","","type","submit",1,"w-25",3,"click"],["mat-raised-button","","type","button",1,"w-25","m-3",3,"click"]],template:function(o,a){1&o&&(t.j41(0,"mat-card-header",0)(1,"mat-card-title"),t.EFF(2,"Iniciar sesi\xf3n"),t.k0s()(),t.j41(3,"mat-card-content")(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t.EFF(7,"Usuario"),t.k0s(),t.nrm(8,"input",3),t.j41(9,"mat-icon",4),t.EFF(10,"email"),t.k0s(),t.DNE(11,j,2,1,"mat-error",5),t.k0s(),t.j41(12,"mat-form-field",2)(13,"mat-label"),t.EFF(14,"Contrase\xf1a"),t.k0s(),t.nrm(15,"input",6),t.j41(16,"button",7),t.bIt("click",function(){return a.toggleInputType()}),t.j41(17,"mat-icon"),t.EFF(18,"visibility"),t.k0s()(),t.DNE(19,T,2,1,"mat-error",5),t.k0s(),t.j41(20,"div",8)(21,"button",9),t.bIt("click",function(){return a.onSubmit()}),t.EFF(22,"Validar"),t.k0s(),t.j41(23,"button",10),t.bIt("click",function(){return a.toRegister()}),t.EFF(24,"Registrarse"),t.k0s()()()()),2&o&&(t.R7$(4),t.Y8G("formGroup",a.loginForm),t.R7$(7),t.Y8G("ngIf",a.hasError("email")),t.R7$(4),t.Y8G("type",a.passwordInputType),t.R7$(4),t.Y8G("ngIf",a.hasError("password")))},dependencies:[f.bT,g.$z,g.iY,F.An,n.rl,n.nJ,n.TL,n.yw,s.qT,s.me,s.BC,s.cb,s.j4,s.JD,E.fg,m.m2,m.MM,m.dh]})}}return r})()}];let G=(()=>{class r{static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275mod=t.$C({type:r})}static{this.\u0275inj=t.G2t({imports:[c.iI.forChild(y),c.iI]})}}return r})();var N=i(3887);let $=(()=>{class r{static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275mod=t.$C({type:r})}static{this.\u0275inj=t.G2t({imports:[f.MD,G,N.G]})}}return r})()}}]);