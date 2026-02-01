document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}

document.getElementById('right2').onclick = function(){
    let lists = document.querySelectorAll('#item-feedback');
    document.getElementById('product-wrapper2').appendChild(lists[0]);
}
document.getElementById('left2').onclick = function() {
    let lists = document.querySelectorAll('#item-feedback');
    document.getElementById('product-wrapper2').prepend(lists[lists.length - 1]);
}