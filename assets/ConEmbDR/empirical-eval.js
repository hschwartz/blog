


var table = {
"demographics": {50: 16, 100: 128, 200: 512, 500: 768, 1000: 768},
"personality": {50: 16, 100: 16, 200: 32, 500: 64, 1000: 90},
"mental health": {50: 16, 100: 22, 200: 45, 500: 64, 1000: 64},
}

//TODO: Finish linking the model files
//var gh_models_url = "https://github.com/adithya8/ConEmbDR/models/rpca_roba_" 
var models_base_url = "/blog/assets/ConEmbDR/models/" 
var links = {
	"demographics": {50: "fb20/rpca_roberta_16_D_20.pickle", 
					100: "fb20/rpca_roberta_128_D_20.pickle", 
					200: "fb20/rpca_roberta_512_D_20.pickle", 
					500: "", 1000: ""},
	"personality": {50: "fb20/rpca_roberta_16_D_20.pickle", 
					100: "fb20/rpca_roberta_16_D_20.pickle", 
					200: "fb20/rpca_roberta_32_D_20.pickle", 
					500: "fb20/rpca_roberta_64_D_20.pickle", 
					1000: "fb20/rpca_roberta_128_D_20.pickle"},
	"mental health": {50: "mental-health/rpca_roberta_16.tar.gz", 
					100: "mental-health/rpca_roberta_32.tar.gz", 
					200: "mental-health/rpca_roberta_64.tar.gz", 
					500: "mental-health/rpca_roberta_64.tar.gz", 
					1000: "mental-health/rpca_roberta_64.tar.gz"},
	}

var Nta = [50, 100, 200, 500, 1000]

function changeFunc() {
		var selectTask = document.getElementById("task");
		var selectedTaskValue = selectTask.options[selectTask.selectedIndex].value;

	var selectSamples = document.getElementById("samples");
		var selectedSamplesValue = selectSamples.options[selectSamples.selectedIndex].value;

		var answer = document.getElementById("answer");
		var dwnld = document.getElementById("dwnld");

		if (selectedSamplesValue !== null && selectedTaskValue !== null){

			if (table[selectedTaskValue][parseInt(selectedSamplesValue)] !== 768){
				answer.innerHTML = "Reduce Roberta base embeddings to " + table[selectedTaskValue][parseInt(selectedSamplesValue)].toString() + " dimensions using PCA."
			}
			else {
				answer.innerHTML = "Use the Roberta embeddings as is."
			}
			//dwnld.download = gh_models_url
			
			if (links[selectedTaskValue][parseInt(selectedSamplesValue)] === ""){
				dwnld.hidden = true
				dwnld.href = "#"
			}
			else{
				dwnld.hidden = false
				dwnld.href = models_base_url + links[selectedTaskValue][parseInt(selectedSamplesValue)]
			}
		}
}