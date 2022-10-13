import {  useState } from 'react';

import {useSelector,useDispatch} from 'react-redux'
import './Exp.css'
import { expaction } from '../redux/Expensereduce';
import {premiumAction} from '../redux/Premium'
function Eform(props) {
   
    const arrayget = useSelector(state=>state.exp.array)
    const isPremium = useSelector(state=>state.premium.isPremium)
    const theme = useSelector(state=>state.premium.theme)
    // console.log(arrayget)
    // const auth = useContext(Contextcreate)
    const dispatch = useDispatch()
    const [vals,setvals]= useState({
        amt:null,
        desc:'',
        cat:'--select--'
        
    })

    function onchangehndle(e){
        switch (e.target.name) {
            case 'amt':
                setvals({...vals,amt:e.target.value})
                break;
            case 'desc':
                setvals({...vals,desc:e.target.value})
                break;
            case 'expop':
                setvals({...vals,cat:e.target.value})
                break;
            default:
                break;
        }
    }

  async  function addexpense(){
        if(vals.amt!=null && vals.desc!=='' && vals.cat!='--select--'){
            try{
                const resp = await fetch('https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/exp.json',{
                    method:'POST',
                    body:JSON.stringify(vals)
                })
                const data = await resp.json()
                if(!resp.ok){
                    alert(data.error.message)
                }
                else{
                    // console.log(data.name)
                    let newObj={
                        amt:vals.amt,
                        desc:vals.desc,
                        cat:vals.cat,
                        id:data.name
                    }
                    dispatch(expaction.arrayset(newObj))

                    setvals({
                        amt:'',
                        desc:'',
                        cat:'--select--'
                    })
                }
            }
            catch(err){
                console.log(err)
            }
            // auth.arryadd(vals)
        }
        else{
            alert('All fields are mandatory')
        }
       
    }

    async function deletelist(e){
        let name = e.target.id
        const resp = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/exp/${name}.json`,{
            method:'DELETE'
        })
        const data = resp.json()
        if(!resp.ok){
            alert(data.error.message)
        }
        else{
            // console.log(arrayget)
            var result=arrayget.filter(obj=> obj.id != name);
            // auth.setarray(result)
            // dispatch(expaction.arrayreplace(result))
            dispatch(expaction.arrayreplace(result))
            // console.log(result)
        }
    }

    async function editlist(e){
        let name = e.target.name
        const resp = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/exp/${name}.json`,{
            method:'PUT',
            body:JSON.stringify(vals)
        })
        const data = resp.json()
        if(!resp.ok){
            alert(data.error.message)
        }
        else{
  
          let newarr=[]
          for(let i=0;i<arrayget.length;i++){
            if(arrayget[i].id==name){
             let newJ={
                    amt:vals.amt,
                    desc:vals.desc,
                    cat:vals.cat,
                    id:name
                }
                newarr.push(newJ)
            }
            else{
                newarr.push(arrayget[i])
            }
          }
        //   console.log(newarr)
        //   auth.setarray(newarr)
          dispatch(expaction.arrayreplace(newarr))
        }
    }
    const [modetxt,setmodetxt] =useState('Dark mode')
    function themechng(){
        modetxt=='Dark mode'?setmodetxt('Light mode'):setmodetxt('Dark mode')
        modetxt=='Dark mode'?dispatch(premiumAction.setheme('dark')):dispatch(premiumAction.setheme('light'))
       

    }
  

    function makeCSV(array){
       return  array.map(itm=>JSON.stringify(itm))
    }
    // 
    let blob1=new Blob(makeCSV(arrayget))

    // console.log(makeCSV(arrayget))
    return ( 
        <div data-theme={theme}>
           {isPremium && props.val && <div className='toggle-theme' ><span onClick={themechng} className='toggletxt'>{modetxt}</span>
           <span className='downlodtxt'><a id='a1'download='file.csv'href={URL.createObjectURL(blob1)} >Download</a></span>
           </div>}
            <div className='expfrm_whole' >
            <input type='number' name='amt' className='expfrminp'placeholder='Enter Amount'value={vals.amt} onChange={onchangehndle}></input>
            <textarea type='number' maxLength='60'onChange={onchangehndle} name='desc' className='expfrmdesc' rows='5'placeholder='Expense Description' value={vals.desc}></textarea>
            <div className='expsel_container'>
                <label for='expop' className='expop'>Expense Category</label>
              
            <select className='exp_select'name='expop'onChange={onchangehndle} value={vals.cat}>
                <option>--select--</option>
                <option>Food</option>
                <option>Petrol</option>
                <option>Other</option>
            </select>
            </div>
            
        </div>
        <div className='expsub ligth-theme'><button className='expsubbtn' onClick={addexpense}>ADD Expense</button></div>
        <div className='fancybrd'></div>

        {
           arrayget.map((itms)=>(
                <div className='elist_cnt' >
                <div className='elist_txt'>
                    <div className='listcatz'>
                    <span className='elist_amt'>Amount:</span>
                    <span className='elist_amt'>Description:</span>
                   <span className='elist_amt'>Category:</span>
                    </div>
                    <div className='listcatz'>
                    <span className='elist_fancytxt'>{itms.amt}</span>
                    <span className='elist_fancytxt'>{itms.desc}</span>
                    <span className='elist_fancytxt'>{itms.cat}</span>
                    </div>
                </div>
                <div className='elist_btns'>
                    <button className='expedit' name={itms.id} onClick={editlist}>Edit</button>
                    <button className='expedit'id={itms.id} onClick={deletelist}>Delete</button>
                    </div>   
            </div>
            ))
           }
        

        </div>
        
        );
}

export default Eform;