const app = Vue.createApp({	})
	app.component('app-mytable', {
        components: {
			paginate: VuejsPaginateNext,
	    },
		data: function(){
			return  {
                err:'',
                msg:'',
                currentPage: 1,
            } 
		},
		template: `	
        <h1>8.1C My Table</h1>
        <table class="table table-bordered">
          <caption>List of Units</caption>
          <thead>
            <tr>
              <th id="codeHeader">Code</th>
              <th id="descHeader">Description</th>
              <th id="cpHeader">CP</th>
              <th id="typeHeader">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in getItems">
              <td scope="col" headers="codeHeader">{{ m.code }}</td>
              <td scope="col" headers="descHeader">{{ m.desc }}</td>
              <td scope="col" headers="cpHeader">{{ m.cp }}</td>
              <td scope="col" headers="typeHeader">{{ m.type }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Vue Paginate template -->
        <paginate 
            :page-count="5"    
            :page-range="5" 
            :margin-pages="1"
            :click-handler="clickCallback" 
            :prev-text=" 'Prev Page' " 		
            :next-text="'Next Page'" 
            :container-class="'pagination'" 
            :active-class="'currentPage'"
             >
        </paginate>
        `,
		mounted() { //Called after the instance has been mounted
			var self = this;
			var url = 'resources/units-1.json';
			fetch(url)     //javascript fetch api  
			.then( response =>{
			  //turning the response into the usable data
			  return response.json( );
			})
			.then( data =>{
			  //This is the data you wanted to get from url
			  self.msg=data;
			})
			.catch(error => {
			  self.err=error
			});
  		},
        computed: {
            getItems: function() {
               let current  = (this.currentPage - 1) * 5;
               let start  = current + 5;
               return this.msg.slice(current, start );
             }
           },
        methods: {
             //sets the clicked page
             clickCallback: function(pageNum) {
               this.currentPage = Number(pageNum);
             }
           }
    })

app.mount('#app')