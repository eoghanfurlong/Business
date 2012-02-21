//REST exmaple
/**
 * Help desk software is used by support desk agents (also called operators) to monitor the user environment for issues ranging from technical problems to user preferences and satisfaction.
 * Businesses typically use help desk software to:
 * answer commonly asked questions with an FAQ or knowledge base
 * track issues through their life-cycle
 * streamline and record customer interactions, including phone calls & live chats
 * Help desk software reduces the need to rely upon email-only support, reducing the number of transactions and missed or lost messages.
 */
var zendesk={
  zenDeskUrl : "http://fhbusiness.zendesk.com", // Zendesk URL
  agentAuth:"keyang.xiang@gmail.com:password",  //agent that will create tickets for end-users. it is in username:password format. required by Zendesk API
  agentHeader:"X-On-Behalf-Of", // agent header is used by Zendesk to locate the end-users. required by Zendesk API
  /**
   * Create a new ticket with a email address
   * Tutorial: How to post a REST request with xml request body & How to parse and retrieve xml type response.
   */
  newRequest:function(subject, content,userEmail){
  	var requestBody=<ticket>
		<subject></subject>
		<description></description>
		<requester-email></requester-email>
	 </ticket>
	 var apiRelUrl="/tickets.xml"; //Relative api url
	 var apiAbsUrl=this.zenDeskUrl+apiRelUrl;
	 var auth=this.agentAuth;
	 //pass user parameters to request body
	 requestBody.subject=subject;
	 requestBody['requester-email']=userEmail;
	 requestBody.description=content;
	 
	 //prepare REST call
	 var userOpt={
	 	contentType:"application/xml", // contentype is  xml,  required by zendesk
	 	method:"POST", // use POST method. required by zendesk
	 	body:requestBody.toString() 
	 }
	 
	 var res=this.webcall(apiAbsUrl,auth,userOpt);
	 
	 return res;
	 
  },
  /**
   * List all tickets that are created by a user.
   * Tutorial: How to parse JSON type response
   */
  listUserRequests:function(userEmail){
  	var requestBody=null;  // this request does not need request body.
  	
  	var apiRelUrl="/requests.json";
  	var apiAbsUrl=this.zenDeskUrl+apiRelUrl;
  	var auth=this.agentAuth;
  	
  	//Prepare REST call
  	var agentHeader=this.agentHeader;
  	var userOpt={
  		headers:[{
  			name:agentHeader,
  			value:userEmail
  		}
  		]
  	}
  	
  	var res=this.webcall(apiAbsUrl,auth,userOpt);
  	
  	return res;
  	
  },
  webcall : function(url, auth,userOpt) {
  	var encodedAuth=Base64.encode(auth);
	 if(auth == null) {
		auth = "";
	 }
	 var opt={
		url : url,
		method : "GET",
		charset : 'UTF-8',
		contentType : 'text/json',
		headers : [{
		  name : "Authorization",
		  value : "Basic " + encodedAuth  //Zendesk uses HTTP Authorization header as authentication method.
		}],
		period : 3600
	 };
	 if (userOpt!=undefined){
		for (var key in userOpt){
			if (key==="headers"){
				opt['headers'].concat(userOpt['headers']);
			}else{
				opt[key]=userOpt[key];
			}
		  
		}
	 }
	 // log(opt);
	 return $fh.web(opt);
  },
  getHeader:function(res,headerName){
  	var headers=res.headers;
  	for (var i=0;i<headers.length;i++){
		if (headerName === headers[i].name){
		  return headers[i].value;
		}
	 }
  }
}
