import{d as S,r as $,a as m,c as j,w as i,o as _,b as l,e as n,f as C,g as D,h as A,i as g,F as N,j as I,u as x,t as b,k as q}from"./index-116ffcad.js";import{_ as P}from"./Result.vue_vue_type_script_setup_true_lang-f45af7e7.js";const U={slot:"footer",class:"dialog-footer flex justify-center mt-5"},E=S({__name:"NewTheme",props:{isVisible:Boolean},emits:["close","submit"],setup(k,{emit:e}){const d=k,r=$({themeName:"",creator:"",holdTime:""}),h=()=>{e("close")},v=()=>{const a=new Date(r.holdTime).getTime(),u={...r,holdTime:a.toString()};e("submit",u)};return(y,a)=>{const u=m("el-input"),c=m("el-form-item"),w=m("el-date-picker"),f=m("el-form"),t=m("el-button"),o=m("el-dialog");return _(),j(o,{modelValue:d.isVisible,"onUpdate:modelValue":a[3]||(a[3]=s=>d.isVisible=s),onClose:h,title:"新增主題",class:"w-[90%]"},{default:i(()=>[l(f,{ref:"form",model:r,"label-width":"120px","label-position":"left"},{default:i(()=>[l(c,{label:"主題"},{default:i(()=>[l(u,{modelValue:r.themeName,"onUpdate:modelValue":a[0]||(a[0]=s=>r.themeName=s),placeholder:"請輸入主題",required:""},null,8,["modelValue"])]),_:1}),l(c,{label:"出題者"},{default:i(()=>[l(u,{modelValue:r.creator,"onUpdate:modelValue":a[1]||(a[1]=s=>r.creator=s),placeholder:"請輸入出題者",required:""},null,8,["modelValue"])]),_:1}),l(c,{label:"舉辦日期"},{default:i(()=>[l(w,{modelValue:r.holdTime,"onUpdate:modelValue":a[2]||(a[2]=s=>r.holdTime=s),type:"date",placeholder:"請選擇日期",required:""},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),n("span",U,[l(t,{onClick:h},{default:i(()=>[C("取消")]),_:1}),l(t,{onClick:v},{default:i(()=>[C("送出")]),_:1})])]),_:1},8,["modelValue"])}}}),F={class:"h-full flex flex-col overflow-auto"},H={class:"overflow-auto"},M={key:0},O=["onClick"],z={class:"mb-2 items-center"},J={class:"mb-2"},L={class:"mb-2"},R={class:"mb-2"},W={key:1},Y=n("div",{class:"card-content"},[n("p",null,"未有資料")],-1),G={class:"flex items-center justify-center mt-4"},Z=S({__name:"HomePage",setup(k){const e=$({type:"success",msg:"",visible:!1,title:""}),d=D(!1),r=()=>{d.value=!0},h=()=>{d.value=!1},v=()=>{e.visible=!1},y=async t=>{try{const o=await x().post("/uploadTheme.php",t);e.msg=o.message,e.type="success",e.visible=!0,await f()}catch(o){e.msg=o.message,e.type="error",e.visible=!0}d.value=!1},a=t=>{q.push({name:"ThemePage",query:{themeId:t}})},u=t=>{const o=new Date(Number(t)),s=o.getFullYear(),T=String(o.getMonth()+1).padStart(2,"0"),V=String(o.getDate()).padStart(2,"0");return`${s}/${T}/${V}`},c=D([]),w=async t=>{try{const o=await x().get("/getAllArticle.php",{params:{themeId:t}});return o.success?o.data.list.length:0}catch(o){return e.msg=`Error Message: ${o.message}, 使用假資料替代`,e.type="error",e.visible=!0,1}},f=async()=>{try{const t=await x().get("/getAllTheme.php");if(!t.success){e.msg=t.message,e.type="error",e.visible=!0,c.value=[];return}const o=await Promise.all(t.data.map(async s=>({themeId:s.themeId,themeName:s.themeName,holdTime:s.holdTime,creator:s.creator,participants:await w(s.themeId)})));c.value=o;return}catch(t){e.title=t.message,e.msg="使用假資料替代",e.type="error",e.visible=!0,c.value=[{themeId:"1",themeName:"旅遊經驗",holdTime:"1689868800000",creator:"Jacky",participants:"1"}];return}};return A(async()=>{await f();const t=document.getElementById("contain");t!==null&&t.scrollHeight>t.clientHeight&&(t.style.overflow="scroll",t.style.paddingBottom="68px")}),(t,o)=>{const s=m("el-card"),T=m("DocumentAdd"),V=m("el-icon");return _(),g(N,null,[l(P,{visible:e.visible,type:e.type,msg:e.msg,title:e.title,onClose:v},null,8,["visible","type","msg","title"]),l(E,{"is-visible":d.value,onClose:h,onSubmit:y},null,8,["is-visible"]),n("div",F,[n("div",H,[c.value.length>0?(_(),g("div",M,[(_(!0),g(N,null,I(c.value,(p,B)=>(_(),j(s,{key:B,class:"w-4/5 mx-auto mb-4 border border-gray-300 cursor-pointer"},{default:i(()=>[n("div",{class:"card-content p-[10px]",onClick:K=>a(p.themeId)},[n("h2",z,b(p.themeName),1),n("p",J," 舉辦時間: "+b(u(p.holdTime)),1),n("p",L,b(p.creator)+" 出題",1),n("p",R,"投稿數量: "+b(p.participants),1)],8,O)]),_:2},1024))),128))])):(_(),g("div",W,[l(s,{class:"w-4/5 mx-auto border border-gray-300"},{default:i(()=>[Y]),_:1})]))]),n("div",G,[n("div",{class:"w-[60px] h-[60px] rounded-full flex items-center justify-center bg-blue-800 cursor-pointer",onClick:o[0]||(o[0]=p=>r())},[l(V,{size:"30",class:"text-white"},{default:i(()=>[l(T)]),_:1})])])])],64)}}});export{Z as default};
