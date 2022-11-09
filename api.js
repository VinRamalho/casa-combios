const fetchCurrency = async (currency) => {
    const result = await fetch(`https://api.exchangerate.host/latest?base=${currency}`);
    const data = await result.json();
    handleRates(data);
    renderBase(data);

}

// PHP
// $req_url = 'https://api.exchangerate.host/latest';
// $response_json = file_get_contents($req_url);
// if(false !== $response_json) {
//     try {
//         $response = json_decode($response_json);
//         if($response->success === true) {
//             var_dump($response);
//         }
//     } catch(Exception $e) {
//         // Handle JSON parse error...
//     }
// }  

