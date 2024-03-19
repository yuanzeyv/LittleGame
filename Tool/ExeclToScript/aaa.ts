class qqq{
    private aaa:number =1 ;
    public* Dec(){
        yield 1; 
        yield 2; 
        yield 3; 
        yield 4; 
        yield 5; 
        yield 6; 
        yield 7; 
        return 8;
    }

    public* Add(){  
        let qqq = this.Dec();  
        yield 1;
        yield 2;  
        yield 3; 
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        console.log(qqq.next());
        yield 4; 
        yield 5; 
        yield 6; 
        yield 7; 
        return 8;
    }
}


let qq = new qqq();
let handle = qq.Add();

console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
console.log(handle.next());
