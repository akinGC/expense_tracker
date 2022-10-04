import { Fragment, useContext, useState } from 'react';
import Contextcreate from '../context/Contextcreate';
import './Exp.css'

function Eform() {
    const auth = useContext(Contextcreate)
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
                    console.log(data.name)
                    let newObj={
                        amt:vals.amt,
                        desc:vals.desc,
                        cat:vals.cat,
                        id:data.name
                    }
                    auth.arryadd(newObj)
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
    return ( 
        <Fragment>
            <div className='expfrm_whole'>
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
        <div className='expsub'><button className='expsubbtn' onClick={addexpense}>ADD Expense</button></div>
        <div className='fancybrd'></div>

        {
            auth.array.map((itms)=>(
                <div className='elist_cnt' id={itms.id}>
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
                <div className='elist_btns'></div>   
            </div>
            ))
           }
        

        </Fragment>
        
        );
}

export default Eform;