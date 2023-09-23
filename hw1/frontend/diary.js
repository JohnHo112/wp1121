// 获取 URL 中的参数值
function getParameterByName(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
}

async function main() {
    
    console.log(getParameterByName("date"))
    console.log(getParameterByName("label"))
    console.log(getParameterByName("feeling"))
    console.log(getParameterByName("content"))


}

main()