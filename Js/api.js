
const fetchJson = async(endPoint,name)=>{
    try{
        const resposta = `${endPoint}${name}`
        const resultado = await fetch(resposta)
        const resultadoJSON = await resultado.json();
        return resultadoJSON
    }catch (error){
        // throw new Error(error.message);
        return (error)
    }
}