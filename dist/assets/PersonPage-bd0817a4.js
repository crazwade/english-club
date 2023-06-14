import{d as P,g as i,n as m,u as j,h as x,a as c,i as _,e as o,b as g,w as T,p as f,F as v,j as H,o as p,c as L,_ as V}from"./index-4bc9248b.js";const B={class:"slider-demo-block px-1"},J=["innerHTML"],N={class:"demo-image__lazy"},O=P({__name:"PersonPage",setup(z){const t=i([]),a=i(""),n=i(50),y=m(()=>46+n.value-50),b=m(()=>46+50-n.value),d=j().query.postId;function u(e){return e.split(/\r?\n/).map(r=>`<p>${r}</p>`).join("<br>")}const w=async()=>{if(d==="6"){const e={files:["http://192.168.86.52/english/upload/2/6/0_photo_2023-05-19_18-18-48.jpg","http://192.168.86.52/english/upload/2/6/1_photo_2023-05-19_18-18-51.jpg","http://192.168.86.52/english/upload/2/6/2_photo_2023-05-19_18-18-53.jpg","http://192.168.86.52/english/upload/2/6/3_photo_2023-05-19_18-18-55.jpg"],content:`I'm more like a easy-going person, a jam-packed schedule is not my style of trip.\r
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
For sure the flight is expensive, but after that? I can afford it.`,poster:"Jacky"};t.value=e.files,a.value=u(e.content)}if(d==="7"){const e={files:["http://192.168.86.52/english/upload/3/7/0_二頭松鼠.JPG"],content:`im good\r
im 19\r
\r
\r
im byebye`,poster:"JJ"};t.value=e.files,a.value=u(e.content)}};return x(()=>{w()}),(e,s)=>{const h=c("el-slider"),r=c("el-card"),k=c("el-image");return p(),_(v,null,[o("div",B,[g(h,{modelValue:n.value,"onUpdate:modelValue":s[0]||(s[0]=l=>n.value=l)},null,8,["modelValue"])]),o("div",{class:"containerPost",style:f({height:`${y.value}%`})},[g(r,{class:"overflow-auto"},{default:T(()=>[o("div",{class:"card-content",innerHTML:a.value},null,8,J)]),_:1})],4),o("div",{class:"containerPost",style:f({height:`${b.value}%`})},[o("div",N,[(p(!0),_(v,null,H(t.value,(l,I)=>(p(),L(k,{key:I,src:l,"preview-src-list":t.value,fit:"cover",lazy:!0},null,8,["src","preview-src-list"]))),128))])],4)],64)}}});const F=V(O,[["__scopeId","data-v-feb0ac1a"]]);export{F as default};
