const colors = [
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-pink-200",
    "bg-pink-300",
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
];

const pickRandomColor = ()=>{
    const color = colors[Math.floor(Math.random()*colors.length)];
    
    if(parseInt(color.split('-')[2])>300){
        return{
            color,
            textColor:"text-white"
        };
    }
    return{
        color,
        textColor:"text-black"
    };
}


export default pickRandomColor;