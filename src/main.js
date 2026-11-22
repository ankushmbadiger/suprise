import Phaser from 'phaser';
import Vendor from './objects/Vendor.js';
import './style.css';

const W = 720, H = 960;
const C = {
  cream: 0xfffaf3, pink: 0xf5bfd0, deepPink: 0xd96e91,
  mint: 0x9bcdb6, darkMint: 0x548c78, yellow: 0xf5cf79,
};
const FILLINGS = ['Potato masala', 'Chana & potato', 'Sprout mix', 'Everything mix'];
const CHUTNEYS = ['Sweet & spicy', 'Tamarind date', 'Extra mint'];
const PANIS = ['Mint-coriander', 'Jeera & lemon', 'Garlic punch'];
const defaults = () => ({ filling: FILLINGS[0], chutney: CHUTNEYS[0], pani: PANIS[0] });
const state = {
  shell: 'Classic crispy', count: 5, mode: 'same', shared: defaults(),
  puris: [], currentPuri: 0, placed: 0,
};

function label(scene, x, y, str, size=25, color='#493b43', opts={}) {
  return scene.add.text(x, y, str, {
    fontFamily: 'Trebuchet MS, system-ui, sans-serif', fontSize: `${size}px`,
    color, fontStyle: opts.bold === false ? 'normal' : 'bold',
    align: opts.align || 'center', wordWrap: { width: opts.wrap || 620 }, lineSpacing: 6,
  }).setOrigin(0.5);
}
function pill(scene, x, y, w, h, text, onClick, selected=false, size=21) {
  const bg = scene.add.graphics();
  bg.fillStyle(selected ? C.mint : C.cream, 1);
  bg.lineStyle(3, selected ? C.darkMint : C.pink, 1);
  bg.fillRoundedRect(x-w/2, y-h/2, w, h, 20);
  bg.strokeRoundedRect(x-w/2, y-h/2, w, h, 20);
  label(scene, x, y, text, size, '#493b43', {wrap:w-22});
  scene.add.rectangle(x,y,w,h,0xffffff,0.001).setInteractive({useHandCursor:true}).on('pointerdown',onClick);
}
function button(scene, x, y, text, onClick, w=420, h=70) {
  const g=scene.add.graphics();
  g.fillStyle(C.deepPink,1); g.fillRoundedRect(x-w/2,y-h/2,w,h,25);
  g.lineStyle(3,0xffe8ee,1); g.strokeRoundedRect(x-w/2,y-h/2,w,h,25);
  label(scene,x,y,text,25,'#ffffff');
  scene.add.rectangle(x,y,w,h,0xffffff,0.001).setInteractive({useHandCursor:true}).on('pointerdown',onClick);
}
function base(scene,title,subtitle='') {
  scene.cameras.main.setBackgroundColor('#fff1e9');
  const g=scene.add.graphics();
  g.fillStyle(C.cream,1); g.fillRoundedRect(28,28,W-56,H-56,34);
  g.lineStyle(3,C.pink,0.8); g.strokeRoundedRect(28,28,W-56,H-56,34);
  [[75,90],[640,115],[85,845],[635,820]].forEach(([x,y],i)=>{
    g.fillStyle(i%2?C.yellow:C.pink,0.9); g.fillCircle(x,y,7);
  });
  label(scene,W/2,92,title,36);
  if(subtitle) label(scene,W/2,143,subtitle,20,'#806b70',{bold:false,wrap:610});
}
function drawPuri(scene,x,y,scale=1) {
  const g=scene.add.graphics();
  g.fillStyle(0x9d5c2d,1); g.fillEllipse(x,y+10*scale,100*scale,76*scale);
  g.fillStyle(0xd99a50,1); g.fillEllipse(x,y,96*scale,72*scale);
  g.fillStyle(0xf1c47a,1); g.fillEllipse(x-2*scale,y-4*scale,82*scale,60*scale);
  g.fillStyle(0x6b9b55,1); g.fillEllipse(x,y-5*scale,48*scale,22*scale);
  g.fillStyle(0x9b6339,1); g.fillCircle(x-10*scale,y-6*scale,7*scale); g.fillCircle(x+10*scale,y-4*scale,6*scale);
  g.fillStyle(0x7aa6a0,1); g.fillCircle(x,y+6*scale,7*scale);
}
function vendor(scene,x,y,scale=1,expression='happy') {
  const v=new Vendor(scene,x,y); v.root.setScale(scale); v.setExpression(expression); return v;
}
function ensurePuriDefaults() {
  state.puris = Array.from({length:state.count},()=>({...state.shared}));
}

class WelcomeScene extends Phaser.Scene {
  constructor(){super('Welcome');}
  create(){
    base(this,'A little pani puri','A tiny game, made with a whole lot of love');
    const g=this.add.graphics();
    g.fillStyle(C.deepPink,1); g.fillRoundedRect(75,205,570,42,16);
    for(let i=0;i<8;i++){g.fillStyle(i%2?C.pink:C.cream,1);g.fillRoundedRect(82+i*70,207,34,37,8);}
    g.fillStyle(0x9a674a,1);g.fillRoundedRect(105,245,510,15,6);
    vendor(this,360,440,2.5,'happy');
    label(this,360,610,'Your pani puri adventure starts here!',24,'#725c60',{bold:false,wrap:560});
    this.add.graphics().fillStyle(0xffffff,1).fillEllipse(360,710,340,90);
    for(let i=0;i<5;i++) drawPuri(this,255+i*52,700,0.48);
    button(this,360,820,'Let’s make a plate!',()=>this.scene.start('Shell'));
    label(this,360,890,'Made for Shravya',17,'#9b858a',{bold:false});
  }
}

class ShellScene extends Phaser.Scene {
  constructor(){super('Shell');}
  create(){
    base(this,'Pick your puri','Choose the crispy shell for the whole plate'); vendor(this,360,245,1.3);
    ['Classic crispy','Extra crunchy','Mini puris'].forEach((v,i)=>pill(this,360,420+i*125,500,82,v,()=>{state.shell=v;this.scene.start('Setup');},state.shell===v,23));
  }
}

class SetupScene extends Phaser.Scene {
  constructor(){super('Setup');}
  create(){
    base(this,'Let’s plan your plate','Choose how many puris, then how you want to customise them');
    vendor(this,360,240,1.2);
    label(this,360,355,'HOW MANY PANI PURIS?',20,'#9b6a75');
    [4,5,6].forEach((n,i)=>pill(this,190+i*170,425,130,72,`${n} puris`,()=>{state.count=n;this.refresh();},state.count===n,22));
    label(this,360,535,'HOW SHOULD WE MAKE THEM?',20,'#9b6a75');
    pill(this,360,620,520,82,'Make every puri the same',()=>{state.mode='same';this.refresh();},state.mode==='same',22);
    pill(this,360,730,520,82,'Choose each puri separately',()=>{state.mode='individual';this.refresh();},state.mode==='individual',22);
    button(this,360,865,'Continue →',()=>{
      if(state.mode==='same') this.scene.start('SharedChoices');
      else {state.puris=Array.from({length:state.count},()=>defaults());state.currentPuri=0;this.scene.start('IndividualPuri');}
    },390,68);
  }
  refresh(){this.scene.restart();}
}

class SharedChoicesScene extends Phaser.Scene {
  constructor(){super('SharedChoices');}
  create(){
    base(this,'Choose the flavours','Pick one in each row');
    this.renderGroup('FILLING',FILLINGS,265,'filling');
    this.renderGroup('CHUTNEY',CHUTNEYS,390,'chutney');
    this.renderGroup('PANI',PANIS,515,'pani');
    button(this,360,700,'Build my plate →',()=>{ensurePuriDefaults();this.scene.start('Assembly');},390,68);
  }
  renderGroup(title,items,y,key){
    label(this,360,y,title,18,'#9b6a75');
    items.slice(0,2).forEach((v,i)=>pill(this,220+i*280,y+55,250,48,v,()=>{state.shared[key]=v;this.scene.restart();},state.shared[key]===v,17));
  }
}

class IndividualPuriScene extends Phaser.Scene {
  constructor(){super('IndividualPuri');}
  create(){
    const index=state.currentPuri;
    const current=state.puris[index] || defaults();
    base(this,`Customise ${index+1}/${state.count}`,'Pick one in each row');
    this.renderGroup('FILLING',FILLINGS,265,'filling',current);
    this.renderGroup('CHUTNEY',CHUTNEYS,390,'chutney',current);
    this.renderGroup('PANI',PANIS,515,'pani',current);
    button(this,360,700,index===state.count-1?'Finish my plate →':'Next puri →',()=>{
      state.puris[index]=current;
      if(index<state.count-1){state.currentPuri++;this.scene.restart();}
      else this.scene.start('Assembly');
    },400,68);
  }
  renderGroup(title,items,y,key,current){
    label(this,360,y,title,18,'#9b6a75');
    items.slice(0,2).forEach((v,i)=>pill(this,220+i*280,y+55,250,48,v,()=>{current[key]=v;this.scene.restart();},current[key]===v,17));
  }
}

class AssemblyScene extends Phaser.Scene {
  constructor(){super('Assembly');}
  create(){
    state.placed=0;
    base(this,'Assemble your plate',`Tap each spot to place your ${state.count} pani puris`);
    vendor(this,360,230,1.0,'happy');
    const cx=360,cy=575,rx=190,ry=135;
    const plate=this.add.graphics(); plate.fillStyle(0xffffff,1);plate.fillEllipse(cx,cy,500,380);
    plate.lineStyle(8,0xf0c6d2,1);plate.strokeEllipse(cx,cy,500,380);
    this.slots=[];
    for(let i=0;i<state.count;i++){
      const a=-Math.PI/2+i*(Math.PI*2/state.count);
      const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
      const circle=this.add.graphics();circle.lineStyle(3,0xe6b7c5,1);circle.strokeCircle(x,y,43);
      const hit=this.add.circle(x,y,48,0xffffff,0.001).setInteractive({useHandCursor:true});
      hit.on('pointerdown',()=>this.place(i,x,y));
      this.slots.push({filled:false});
    }
    this.counter=label(this,360,790,`0 / ${state.count} puris placed`,23);
    this.help=label(this,360,830,'Tap a circle to add a puri',17,'#8b777b',{bold:false});
    button(this,360,900,'Serve it! →',()=>{
      if(state.placed!==state.count){this.help.setText(`Place all ${state.count} puris first!`);return;}
      this.scene.start('Dialogue');
    },350,62);
  }
  place(i,x,y){
    if(this.slots[i].filled)return;
    this.slots[i].filled=true;drawPuri(this,x,y,0.67);state.placed++;
    this.counter.setText(`${state.placed} / ${state.count} puris placed`);
    if(state.placed===state.count)this.help.setText('Perfect! Your plate is ready.');
  }
}

class DialogueScene extends Phaser.Scene {
  constructor(){super('Dialogue');}
  create(){
    base(this,'A little message from the vendor','');vendor(this,360,390,2.0,'shy');
    this.lines=['Whoa… you made that plate look amazing!','I added a little extra flavour to the pani. Just for you.','Your special plate is ready!'];
    this.index=0;this.line=label(this,360,660,this.lines[0],25,'#604c52',{wrap:540});
    button(this,360,820,'Next ',()=>this.advance(),350,72);
  }
  advance(){this.index++;if(this.index>=this.lines.length)this.scene.start('Serving');else this.line.setText(this.lines[this.index]);}
}

class ServingScene extends Phaser.Scene {
  constructor(){super('Serving');}
  create(){
    base(this,'Made fresh, just for you!','A plate with all your chosen flavours');vendor(this,360,250,1.4,'happy');
    const g=this.add.graphics();g.fillStyle(0xffffff,1);g.fillEllipse(360,590,560,360);g.lineStyle(9,0xf0c6d2,1);g.strokeEllipse(360,590,560,360);
    const positions=[];
    for(let i=0;i<state.count;i++){const a=-Math.PI/2+i*(Math.PI*2/state.count);positions.push([360+Math.cos(a)*180,590+Math.sin(a)*120]);}
    positions.forEach(([x,y])=>drawPuri(this,x,y,0.72));
    const summary=state.mode==='same'?`${state.shared.filling} • ${state.shared.chutney} • ${state.shared.pani}`:`${state.count} individually customised puris`;
    label(this,360,805,summary,18,'#806b70',{bold:false,wrap:600});
    button(this,360,900,'Birthday surprise',()=>this.scene.start('Birthday'),390,68);
  }
}

class BirthdayScene extends Phaser.Scene {
  constructor(){super('Birthday');}
  create(){
    const now=new Date();
    const isBirthdayDate=now.getFullYear()===2026 && now.getMonth()===10 && now.getDate()===23;
    if(!isBirthdayDate){
      base(this,'A little surprise is waiting…','');vendor(this,360,345,1.65,'shy');
      label(this,360,610,'This birthday message unlocks on 23 November 2026.',24,'#604c52',{wrap:520});
      label(this,360,680,'Come back on the special day.',22,'#806b70',{bold:false});
      button(this,360,850,'Back to the beginning ↻',()=>this.scene.start('Welcome'),390,68);
      return;
    }
    base(this,'A special plate for Shravya','');vendor(this,360,320,1.65,'shy');
    const g=this.add.graphics();g.fillStyle(0xffffff,1);g.fillRoundedRect(75,500,570,300,32);
    g.lineStyle(4,C.pink,1);g.strokeRoundedRect(75,500,570,300,32);
    label(this,360,555,'Happy Birthday, Shravya! 🎂',34,'#c45d7d',{wrap:520});
    label(this,360,635,"Life's sweet spicy and tangy, just like pani puri.",24,'#604c52',{bold:false,wrap:500});
    label(this,360,715,"Here's a plate of pani puri, just for you! ",24,'#604c52',{bold:false,wrap:500});
    // label(this,360,845,'Made with love, one puri at a time.',19,'#967d83',{bold:false});
    button(this,360,910,'Play again ↻',()=>this.scene.start('Welcome'),350,68);
    for(let i=0;i<18;i++){
      const x=70+Math.random()*580,y=180+Math.random()*680;
      const heart=label(this,x,y,'♥',18+Math.random()*18,'#e89bb2');
      this.tweens.add({targets:heart,y:y-35,alpha:0.15,duration:1800+Math.random()*1000,repeat:-1,yoyo:true});
    }
  }
}

const config={
  type:Phaser.AUTO,parent:'game',width:W,height:H,backgroundColor:'#fff1e9',antialias:true,
  scene:[WelcomeScene,ShellScene,SetupScene,SharedChoicesScene,IndividualPuriScene,AssemblyScene,DialogueScene,ServingScene,BirthdayScene],
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},input:{activePointers:3},
};
new Phaser.Game(config);
