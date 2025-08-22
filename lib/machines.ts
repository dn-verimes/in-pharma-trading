export type Machine = {
  id: string;
  name: string;
  category: 'Blister' | 'Capsule Filling' | 'Tablet Press' | 'Mixing' | 'Filling/Sealing' | 'Counting' | 'Induction' | 'Deblistering' | 'Other';
  shortDescription: string;
  keySpecs: { label: string; value: string }[];
  images: string[];
  status?: 'In stock' | 'On request';
  condition?: 'New' | 'Refurbished';
  capacity?: number; // generic throughput scalar for demo filtering
}

export const categories = ['Blister','Capsule Filling','Tablet Press','Mixing','Filling/Sealing','Counting','Induction','Deblistering','Other'] as const

export const catalog: Machine[] = [
  { id:'ipt-bms-250', name:'IPT BMS 250', category:'Blister', shortDescription:'Compact blister line for tablets/capsules.', keySpecs:[{label:'Max speed', value:'250 blisters/min'},{label:'Format', value:'PVC/ALU'}], images:['/images/machinery/placeholder-1.jpg'], status:'On request', condition:'Refurbished', capacity:250 },
  { id:'ipt-ind-kg', name:'IPT IND-KG', category:'Induction', shortDescription:'Induction sealing system.', keySpecs:[{label:'Neck size', value:'20–110 mm'}], images:['/images/machinery/placeholder-2.jpg'], status:'In stock', condition:'New', capacity:120 },
  { id:'ipt-tht', name:'IPT THT', category:'Tablet Press', shortDescription:'High-speed rotary tablet press.', keySpecs:[{label:'Stations', value:'45'},{label:'Output', value:'300k tabs/h'}], images:['/images/machinery/placeholder-3.jpg'], status:'On request', condition:'New', capacity:300 },
  { id:'ipt-0-0', name:'IPT 0/0', category:'Capsule Filling', shortDescription:'Automatic capsule filler.', keySpecs:[{label:'Capsule size', value:'#00–#4'}], images:['/images/machinery/placeholder-4.jpg'], status:'In stock', condition:'Refurbished', capacity:90 },
  { id:'ipt-fac-72', name:'IPT FAC 72', category:'Filling/Sealing', shortDescription:'Liquid filling & capping line.', keySpecs:[{label:'Nozzles', value:'6'},{label:'Speed', value:'72 bpm'}], images:['/images/machinery/placeholder-5.jpg'], status:'On request', condition:'New', capacity:72 },
  { id:'ipt-s', name:'IPT S', category:'Mixing', shortDescription:'GMP mixing vessel.', keySpecs:[{label:'Volume', value:'500 L'}], images:['/images/machinery/placeholder-6.jpg'], status:'In stock', condition:'New', capacity:60 },
  { id:'ipt-cpsd-100', name:'IPT CPSD 100', category:'Counting', shortDescription:'Tablet counting machine.', keySpecs:[{label:'Channels', value:'12'}], images:['/images/machinery/placeholder-1.jpg'], status:'On request', condition:'Refurbished', capacity:100 },
  { id:'ipt-hdm400', name:'IPT HDM400', category:'Deblistering', shortDescription:'Deblistering unit for recovery.', keySpecs:[{label:'Types', value:'PVC/ALU, ALU/ALU'}], images:['/images/machinery/placeholder-2.jpg'], status:'In stock', condition:'New', capacity:40 },
  { id:'ipt-csa', name:'IPT CSA', category:'Counting', shortDescription:'Counting & sorting system.', keySpecs:[{label:'Accuracy', value:'±1'}], images:['/images/machinery/placeholder-3.jpg'], status:'On request', condition:'New', capacity:80 },
  { id:'ipt-tabr-39', name:'IPT TABR 39', category:'Tablet Press', shortDescription:'Mid-range tablet press.', keySpecs:[{label:'Stations', value:'39'}], images:['/images/machinery/placeholder-4.jpg'], status:'On request', condition:'Refurbished', capacity:150 }
]
