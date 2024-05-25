
import axios from "axios"
export default async function solve(shuffledArray,setshuffledArray,setloading,setMove){
    setloading(true)
    try {
        let bd=""
        for(let i=0;i<16;i++)
      {
        bd+=shuffledArray[i];
        if(i!=15)
        bd+=','
      }
      console.log(bd)
        const res=await axios.post('https://35.154.104.38.sslip.io/puzzle/compute',{
            inputArr:bd
            });
   const data=res.data.result;
   console.log(data)
   //res.data={result:25\n[1,2,3....]}
   let sarr='['+data.match(/\[(.*?)\]/)[1]+']';
   let nextArr=JSON.parse(sarr);
   setshuffledArray(nextArr)
   setMove(prev=>prev+1)
    } catch (error) {
        console.log(error)
        alert('failed to calculate')
    }
    setloading(false)
    
}