:root{--maroon:#7b1730;--gold:#c9a24a;--cream:#fffaf3;--ink:#241a1c;--muted:#756a6c;--white:#fff}
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:var(--cream)}
button,input,select,textarea{font:inherit}.top{background:#241a1c;color:#fff;text-align:center;padding:8px;font-size:13px}.nav{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;gap:22px;padding:16px 5%}.logo{font-family:Georgia,serif;font-size:28px;font-weight:700;color:var(--maroon);margin-right:auto}
.brand-lockup{display:flex;align-items:center;gap:11px;font-family:Georgia,serif;color:var(--maroon);margin-right:auto;white-space:nowrap}
.brand-mark{width:34px;height:34px;border:1.5px solid var(--gold);border-radius:7px;display:grid;place-items:center;transform:rotate(45deg);flex:none;color:var(--gold);font-size:20px}
.brand-mark span{transform:rotate(-45deg)}
.brand-name{letter-spacing:.16em;font-size:24px;font-weight:700}
.brand-lockup--center{justify-content:center;margin:0 auto}
.brand-lockup--center .brand-mark{width:40px;height:40px}
.brand-lockup--center .brand-name{font-size:30px}
.site-login-logo .brand-name{font-size:38px}
.login-brand .brand-name{font-size:32px}
.brand-lockup--footer{margin:0 0 14px;color:#fff}
.brand-lockup--footer .brand-name{font-size:22px;color:#fff}.nav a{color:var(--ink);text-decoration:none;font-size:14px}.iconbtn,.primary,.secondary{border:0;border-radius:8px;padding:10px 14px;cursor:pointer}.iconbtn{background:#f6f0e8}.primary{background:var(--maroon);color:#fff}.secondary{background:#eee5dc}.hero{min-height:500px;display:grid;place-items:center;text-align:center;padding:70px 20px;background:linear-gradient(120deg,#f2dfcf,#fff8ee 55%,#ead0d7)}.hero h1{font:700 64px Georgia,serif;margin:10px 0;color:#4d1324}.hero p{max-width:650px;margin:0 auto 25px;color:#65585b;font-size:18px}.hero .eyebrow{letter-spacing:4px;text-transform:uppercase;color:var(--gold);font-size:13px;font-weight:700}.section{padding:55px 5%}.sectionhead{display:flex;justify-content:space-between;align-items:end;margin-bottom:25px}.section h2{font:700 34px Georgia,serif;margin:0}.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:25px}.filters button{border:1px solid #ded3c9;background:#fff;border-radius:30px;padding:9px 16px;cursor:pointer}.filters button.active{background:var(--maroon);color:#fff}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.card .pic{position:relative;overflow:hidden}.card .pic img{width:100%;height:100%;object-fit:cover;display:block}.image-fallback{display:none}.image-error .image-fallback{display:grid;place-items:center;height:100%;font:700 20px Georgia,serif;color:#fff}.image-error{background:linear-gradient(135deg,#ead0d7,#d9b27d)}

.card{background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eee5dc;box-shadow:0 4px 20px #4d132410}.pic{height:330px;background:linear-gradient(135deg,#ead0d7,#d9b27d);display:grid;place-items:center;color:#fff;font:700 20px Georgia,serif}.cardbody{padding:16px}.tag{font-size:11px;color:var(--gold);text-transform:uppercase;letter-spacing:1px}.name{font-weight:700;margin:7px 0}.price{font-weight:800;color:var(--maroon)}.old{text-decoration:line-through;color:#999;font-weight:400;margin-left:6px;font-size:13px}.cardactions{display:flex;gap:8px;margin-top:12px}.cardactions button{flex:1}.admin{background:#241a1c;color:#fff;padding:55px 5%}.admin h2{font:700 34px Georgia,serif}.adminbar{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0}.panel{background:#fff;color:var(--ink);border-radius:14px;padding:22px;max-width:1100px}.formgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.formgrid input,.formgrid select,.formgrid textarea{width:100%;padding:11px;border:1px solid #ddd;border-radius:8px}.formgrid textarea{min-height:90px}.formgrid .full{grid-column:1/-1}.table{width:100%;border-collapse:collapse;margin-top:18px}.table th,.table td{padding:12px;text-align:left;border-bottom:1px solid #eee}.small{font-size:12px;color:#777}.footer{background:#180f12;color:#ddd;padding:40px 5%;display:flex;justify-content:space-between;gap:30px}.modal{position:fixed;inset:0;background:#0008;display:none;align-items:center;justify-content:center;padding:20px;z-index:10}.modal.open{display:flex}.modalbox{background:#fff;border-radius:14px;padding:24px;max-width:560px;width:100%;max-height:90vh;overflow:auto}.close{float:right;border:0;background:none;font-size:24px;cursor:pointer}

.login-box{background:#fff;border-radius:16px;padding:34px;max-width:460px;width:100%;position:relative;box-shadow:0 20px 60px #0004}
.login-brand{text-align:center;font:700 32px Georgia,serif;color:var(--maroon);margin-bottom:12px}
.login-box h1{text-align:center;font:700 27px Georgia,serif;margin:8px 0}.login-subtitle{text-align:center;color:#777;font-size:14px;margin-bottom:25px}
.login-box label{display:block;font-size:13px;font-weight:600;margin:13px 0 6px}.login-box input[type=text],.login-box input[type=email],.login-box input[type=tel],.login-box input[type=password]{width:100%;padding:13px;border:1px solid #ddd;border-radius:8px;outline:none}.login-box input:focus{border-color:var(--maroon)}
.login-row{display:flex!important;justify-content:space-between;align-items:center;margin:12px 0!important}.login-row a{color:#2167a8;font-size:13px}.remember{display:flex!important;align-items:center;gap:5px;font-weight:400!important;margin:0!important}
.login-primary,.login-secondary{width:100%;padding:13px;border-radius:8px;cursor:pointer;margin-top:10px}.login-primary{border:0;background:var(--maroon);color:#fff}.login-secondary{border:1px solid #bbb;background:#fff;color:var(--ink)}
.login-divider{display:flex;align-items:center;gap:10px;color:#aaa;margin:18px 0}.login-divider:before,.login-divider:after{content:"";height:1px;background:#ddd;flex:1}.login-note{font-size:11px;color:#888;text-align:center;margin-top:18px;line-height:1.4}

.detail-layout{display:grid;grid-template-columns:46% 54%;gap:28px;max-width:1280px;margin:auto}
.detail-gallery{min-width:0}
.main-product-image{height:650px;border-radius:8px;background:linear-gradient(135deg,#ead0d7,#c9a24a);display:grid;place-items:center;color:#fff;font:700 30px Georgia,serif;background-repeat:no-repeat}
.thumbs{display:flex;gap:10px;margin-top:12px;overflow:auto}
.thumb{min-width:78px;height:92px;border:1px solid #ccc;border-radius:6px;display:grid;place-items:center;background:#f7f7f7;color:#777;font-size:12px;background-size:cover;background-position:center}
.thumb.active{border:2px solid var(--maroon)}
.detail-info{padding:5px 18px 20px 0}
.seller{color:#2167a8;font-size:14px;margin-bottom:8px}
.detail-info h1{font-size:30px;line-height:1.22;font-weight:500;margin:0 0 10px}
.rating{display:inline-block;background:#177245;color:#fff;border-radius:4px;padding:5px 8px;font-size:13px}
.rating span{background:#fff;color:#2167a8;margin-left:6px}
.line{height:1px;background:#ddd;margin:12px 0}
.deal{display:inline-block;color:#c9233c;font-size:25px;margin-right:12px}
.detail-price{font-size:36px;font-weight:700}
.mrp,.tax,.emi{margin:6px 0;color:#555}.tax{font-size:14px}.emi{font-size:15px}
.detail-info h3{margin:20px 0 10px;font-size:20px}
.offer-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.offer{border:1px solid #ddd;border-radius:7px;padding:13px;min-height:120px;box-shadow:0 1px 3px #00000010}
.offer p{font-size:13px;line-height:1.35;margin:8px 0}.offer a{color:#1769aa;font-size:13px}
.benefits{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #ddd;border-top:1px solid #ddd;margin:18px 0;padding:14px 0;text-align:center;gap:8px}
.benefits div{display:flex;flex-direction:column;gap:4px;font-size:20px}.benefits b{font-size:13px;color:#2167a8}.benefits span{font-size:12px;color:#2167a8}
.selection{font-size:16px;margin:10px 0}.variant-row{display:flex;gap:9px;overflow:auto}
.variant{background:#fff;border:1px solid #aaa;border-radius:6px;padding:7px;min-width:92px;cursor:pointer;display:flex;flex-direction:column;gap:3px;align-items:center}
.variant.selected{border:2px solid var(--maroon)}.variant b{font-size:12px}.swatch{width:42px;height:54px;border-radius:4px;background:linear-gradient(135deg,#74177d,#d9b27d);display:block}.s1{background:linear-gradient(135deg,#a70e45,#e7b5a8)}.s2{background:linear-gradient(135deg,#086b60,#d9b27d)}.s3{background:linear-gradient(135deg,#9c162c,#e7b85e)}.s4{background:linear-gradient(135deg,#1687a9,#d7b15e)}
.detail-stock{color:#16833b;font-size:18px;font-weight:600;margin:18px 0}
.detail-actions{display:flex;gap:10px}.add-large,.buy-large{flex:1;border:0;border-radius:24px;padding:14px;font-size:17px;cursor:pointer}.add-large{background:#ffd21a}.buy-large{background:#ff9818}
.wish{width:100%;margin-top:10px;border:1px solid #aaa;background:#fff;border-radius:7px;padding:12px;cursor:pointer}
.description{border-top:1px solid #ddd;margin-top:18px;padding-top:15px;line-height:1.5}
#detailModal{background:#f6f6f6;padding:30px}.detail-modal-box{max-width:1400px;width:100%;background:#fff;border-radius:10px;padding:25px;max-height:95vh;overflow:auto;position:relative}.detail-modal-box .close{position:absolute;right:18px;top:10px;z-index:2}



.photo-url-row{display:flex;gap:8px;margin:8px 0}
.photo-url-row input{flex:1;padding:11px;border:1px solid #ddd;border-radius:8px}
.photo-error{color:#b21f35;margin-top:7px}
.photo-preview .photo-wrap{position:relative;display:inline-block}
.photo-preview .photo-wrap img{display:block}
.photo-preview .photo-remove{position:absolute;right:2px;top:2px;border:0;border-radius:50%;width:22px;height:22px;background:#fff;color:#a0182e;cursor:pointer}
.photo-upload{border:1px dashed #cdbfb4;padding:14px;border-radius:10px;background:#fffaf6}
.photo-upload input[type=file]{margin-top:8px;width:100%;padding:10px;background:#fff;border:1px solid #ddd;border-radius:8px;cursor:pointer}
.photo-upload input[type=file]::file-selector-button{border:0;background:#7b1730;color:#fff;padding:8px 12px;border-radius:6px;margin-right:10px;cursor:pointer}
.photo-preview{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.photo-preview img{width:72px;height:82px;object-fit:cover;border-radius:6px;border:1px solid #ddd}

.color-input-help{font-size:12px;color:#777;margin-top:4px}

.detail-photo-thumb{cursor:pointer;background-size:cover;background-position:center}

.cart-item{display:flex;align-items:center;gap:12px;border-bottom:1px solid #eee;padding:12px 0}
.cart-thumb{width:58px;height:70px;border-radius:6px;background:linear-gradient(135deg,#ead0d7,#c9a24a);display:grid;place-items:center;color:#fff;font-weight:700}
.cart-info{flex:1;display:flex;flex-direction:column;gap:5px;font-size:14px}.cart-info span{color:#666}
.remove-cart{border:1px solid #c9c9c9;background:#fff;border-radius:7px;padding:8px 12px;color:#a0182e;cursor:pointer}
.remove-cart:hover{background:#fff0f2}.cart-total{display:flex;justify-content:space-between;padding:18px 0;font-size:18px}

@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}.nav a{display:none}.hero h1{font-size:45px}}@media(max-width:900px){.detail-layout{grid-template-columns:1fr}.main-product-image{height:480px}.detail-info{padding-right:0}.offer-row{grid-template-columns:1fr}.benefits{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.grid{grid-template-columns:1fr}.formgrid{grid-template-columns:1fr}.footer{display:block}.detail-info h1{font-size:23px}.detail-price{font-size:29px}.main-product-image{height:400px}#detailModal{padding:8px}.detail-modal-box{padding:15px}}

.site-login-gate{position:fixed;inset:0;z-index:9999;background:linear-gradient(135deg,#241a1c,#7b1730 58%,#c9a24a);display:flex;align-items:center;justify-content:center;padding:20px}
.site-login-card{width:min(440px,100%);background:#fff;border-radius:20px;padding:38px;box-shadow:0 25px 80px #0006;text-align:center}
.site-login-logo{font:700 38px Georgia,serif;color:#7b1730;margin-bottom:8px}
.site-login-eyebrow{font-size:11px;letter-spacing:2px;color:#c9a24a;font-weight:700}
.site-login-card h1{font:700 27px Georgia,serif;margin:16px 0 8px;color:#241a1c}
.site-login-card p{color:#777;font-size:14px;line-height:1.5;margin-bottom:22px}
.site-login-card input{width:100%;padding:14px;margin:6px 0;border:1px solid #ddd;border-radius:9px;outline:none}
.site-login-card input:focus{border-color:#7b1730}
.site-login-btn,.site-create-btn{width:100%;padding:14px;border-radius:9px;margin-top:10px;cursor:pointer;font-weight:700}
.site-login-btn{border:0;background:#7b1730;color:#fff}
.site-create-btn{border:1px solid #bbb;background:#fff;color:#241a1c}

.site-skip-btn{border:0;background:transparent;color:#777;font-size:12px;padding:7px 14px;margin-top:5px;cursor:pointer;text-decoration:underline}
.site-skip-btn:hover{color:#7b1730}

.site-login-demo{font-size:10px;color:#999;margin-top:18px;line-height:1.4}

.audience-section{padding:58px 5%;background:#f7eee7}
.audience-heading{text-align:center;margin:0 auto 28px}
.audience-heading h2{font:700 36px Georgia,serif;margin:8px 0;color:var(--ink)}
.audience-heading p{color:var(--muted);margin:0}
.audience-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;max-width:1100px;margin:auto}
.audience-card{position:relative;min-height:265px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:30px;border-radius:18px;overflow:hidden;text-decoration:none;color:#fff;box-shadow:0 12px 35px #241a1c20;transition:transform .2s,box-shadow .2s}
.audience-card:hover{transform:translateY(-3px);box-shadow:0 17px 40px #241a1c30}
.audience-card:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
.audience-card>*{position:relative;z-index:1}
.audience-card:after{content:"";position:absolute;width:220px;height:220px;border:1px solid #ffffff55;border-radius:50%;top:-55px;right:-18px;box-shadow:0 0 0 20px #ffffff12,0 0 0 42px #ffffff08}
.women-card{background:linear-gradient(135deg,#7b1730,#a95568 62%,#c9a24a)}
.men-card{background:linear-gradient(135deg,#241a1c,#49313b 62%,#805161)}
.audience-kicker{font-size:11px;letter-spacing:2px;color:#f5dfb0}
.audience-card h3{font:700 32px Georgia,serif;margin:12px 0 6px}
.audience-card p{max-width:440px;line-height:1.5;color:#fff;opacity:.92;margin:0 0 20px}
.audience-cta{color:#f5dfb0;font-weight:700}
.men-panel p{max-width:620px;margin:0 auto 22px;color:var(--muted);line-height:1.6}
@media(max-width:560px){.audience-grid{grid-template-columns:1fr}.audience-card{min-height:225px;padding:25px}.audience-card h3{font-size:29px}}
.collection-switch{display:flex;gap:8px;align-items:center}
.collection-switch button{border:1px solid #d9cbc0;background:#fff;color:var(--ink);border-radius:999px;padding:9px 16px;cursor:pointer}
.collection-switch button.active{background:var(--maroon);border-color:var(--maroon);color:#fff}
.collection-switch button:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
#collectionIntro{color:var(--muted);margin:8px 0 0}
@media(max-width:560px){.sectionhead{align-items:flex-start;flex-direction:column;gap:16px}}