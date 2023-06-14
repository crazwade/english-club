import{d as N,g as p,n as w,u as B,h as C,a as l,i as u,e as g,b as d,p as b,w as k,l as x,F as I,j as M,E as P,o as i,c as O,_ as z}from"./index-e1ad9095.js";const j=async _=>{const t=_.map(o=>new Promise((a,n)=>{const s=new Image;s.src=o,s.onload=()=>a(),s.onerror=()=>n()}));try{return await Promise.all(t),!0}catch{return!1}},F={class:"slider-demo-block px-1"},J=["innerHTML"],S={class:"demo-image__lazy"},W=N({__name:"PersonPage",setup(_){const t=p([]),o=p(""),a=p(!0),n=p(50),s=w(()=>46+n.value-50),f=w(()=>46+50-n.value),v=B().query.postId;function c(e){return e.split(/\r?\n/).map(m=>`<p>${m}</p>`).join("<br>")}const T=async()=>{if(v==="6"){const e={files:["https://cdn.pixabay.com/photo/2019/09/15/14/35/city-4478471_1280.jpg","https://cdn.pixabay.com/photo/2018/12/20/16/48/sweden-3886351_1280.jpg","https://cdn.pixabay.com/photo/2016/11/10/19/04/plough-1814954_1280.jpg","https://cdn.pixabay.com/photo/2017/06/09/21/04/alley-2388256_1280.jpg"],content:`I'm more like a easy-going person, a jam-packed schedule is not my style of trip.\r
When it comes to exploring a new place, sure I'll check out the must-see tourist spot like everyone else, and more intent to sleep in and then maybe fine myself chilling at a  oceanfront or a local diner.\r
\r
Over the past 20 years, I have traveled to so many places. One of the most memorable trips was my journey to Northern Europe. About last December I flew to Oslo, Norway, and rented a car to Gothenburg, Sweden for my one-week vaca. The weather, people, vibes and culture are my dream destination.\r
\r
Picture this: during high way no one  will drive over the limit and no flashing headlights, noisy horns or road rage person. That place is paradise on Earth, no joke.\r
\r
Guess the price for this trip ? \r
1. The flight from Taiwan to Oslo costs around 40,000\r
2. We rented a car for a week, which costs around 10,000\r
3. Two Airbnb rentals average 3,000 per night, so that's 21,000 dollars.\r
4. If you cook and buy groceries from a local supermarket would probably be around 500 dollars per day, so that's 3500\r
\r
We are a group of 7 people, and after splitting the trip expenses, it comes to around 50,000 dollars.\r
\r
For sure the flight is expensive, but after that? I can afford it.`,poster:"Jacky"};if(await j(e.files)){t.value=e.files,o.value=c(e.content),a.value=!1;return}P.error("有張圖片壞掉了"),t.value=e.files,o.value=c(e.content),a.value=!1}if(v==="7"){const e={files:["https://cdn.pixabay.com/photo/2019/04/20/18/46/squirrel-4142446_1280.jpg","https://cdn.pixabay.com/photo/2020/12/02/01/06/chipmunk-5795916_1280.jpg"],content:`im good\r
im 19\r
\r
\r
im byebye`,poster:"JJ"};if(await j(e.files)){t.value=e.files,o.value=c(e.content),a.value=!1;return}P.error("有張圖片壞掉了"),t.value=e.files,o.value=c(e.content),a.value=!1}};return C(()=>{T()}),(e,r)=>{const y=l("el-slider"),m=l("el-card"),V=l("el-skeleton-item"),E=l("el-skeleton"),H=l("el-image");return i(),u(I,null,[g("div",F,[d(y,{modelValue:n.value,"onUpdate:modelValue":r[0]||(r[0]=h=>n.value=h)},null,8,["modelValue"])]),s.value>5?(i(),u("div",{key:0,class:"containerPost",style:b({height:`${s.value}%`})},[d(m,{class:"overflow-auto"},{default:k(()=>[g("div",{class:"card-content",innerHTML:o.value},null,8,J)]),_:1})],4)):x("",!0),f.value>5?(i(),u("div",{key:1,class:"containerPost",style:b({height:`${f.value}%`})},[g("div",S,[d(E,{style:{width:"240px"},loading:a.value,animated:"",count:3},{template:k(()=>[d(V,{variant:"image",style:{width:"400px",height:"267px"}})]),_:1},8,["loading"]),(i(!0),u(I,null,M(t.value,(h,L)=>(i(),O(H,{key:L,src:h,"preview-src-list":t.value,fit:"cover",lazy:!0},null,8,["src","preview-src-list"]))),128))])],4)):x("",!0)],64)}}});const A=z(W,[["__scopeId","data-v-40d06045"]]);export{A as default};
