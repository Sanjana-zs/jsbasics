// function definition
function bubbleSort(list){
     const list_size = list.length;

     for( let index_1=0; index_1 < list_size-1; index_1++ ) {

          for( let index_2 = 0; index_2 < list_size - index_1 - 1; index_2++ ) {
                // check the elements
                if( list[index_2] > list[index_2 + 1] ) {
                     let temp = list[index_2];
                     list[index_2] = list[index_2 + 1];
                     list[index_2 + 1] = temp;
                }
          }

     }
}         

// function calling
const num_arr = [1,7,4,89,23,54,357,97];
bubbleSort(num_arr);

console.log(num_arr);