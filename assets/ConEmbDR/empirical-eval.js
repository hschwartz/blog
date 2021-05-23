var table = {
"demographics": {50: 16, 100: 128, 200: 512, 500: 768, 1000: 768, 2000: 768, 5000: 768, 10000: 768},
"personality": {50: 16, 100: 16, 200: 32, 500: 64, 1000: 90, 2000: 90, 5000: 181, 10000: 181},
"mental health": {50: 16, 100: 22, 200: 45, 500: 64, 1000: 64, 2000: 64, 5000: 64, 10000: 64},
}

//TODO: Finish linking the model files
//var gh_models_url = "https://github.com/adithya8/ConEmbDR/models/rpca_roba_" 
var models_base_url = "/blog/assets/ConEmbDR/models/" 
var links = {
	"demographics": {50: ["fb20/rpca_roberta_16_D_20.pickle", "fb20/rpca_roberta_16_D_20.csv"], 
			100: ["fb20/rpca_roberta_128_D_20.pickle","fb20/rpca_roberta_128_D_20.csv"], 
			200: ["fb20/rpca_roberta_512_D_20.pickle","fb20/rpca_roberta_512_D_20.csv"], 
			500: ["", ""], 1000: ["", ""], 2000: ["", ""], 5000: ["", ""], 10000: ["", ""]},
	"personality": {50: ["fb20/rpca_roberta_16_D_20.pickle", "fb20/rpca_roberta_16_D_20.csv"], 
			100: ["fb20/rpca_roberta_16_D_20.pickle", "fb20/rpca_roberta_16_D_20.csv"], 
			200: ["fb20/rpca_roberta_32_D_20.pickle", "fb20/rpca_roberta_32_D_20.csv"], 
			500: ["fb20/rpca_roberta_64_D_20.pickle", "fb20/rpca_roberta_64_D_20.csv"], 
			1000: ["fb20/rpca_roberta_128_D_20.pickle", "fb20/rpca_roberta_128_D_20.csv"],
                        2000: ["fb20/rpca_roberta_128_D_20.pickle", "fb20/rpca_roberta_128_D_20.csv"],
                        5000: ["fb20/rpca_roberta_256_D_20.pickle", "fb20/rpca_roberta_256_D_20.csv"],
                        10000: ["fb20/rpca_roberta_256_D_20.pickle", "fb20/rpca_roberta_256_D_20.csv"],},
	"mental health": {50: ["mental-health/rpca_roberta_16_pickle.zip", "mental-health/rpca_roberta_16_csv.zip"], 
			100: ["mental-health/rpca_roberta_32_pickle.zip", "mental-health/rpca_roberta_32_csv.zip"], 
			200: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"], 
			500: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"], 
			1000: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"],
			2000: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"],
			5000: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"],
			10000: ["mental-health/rpca_roberta_64_pickle.zip", "mental-health/rpca_roberta_64_csv.zip"]}
	}

var Nta = [50, 100, 200, 500, 1000, 2000, 5000, 10000]
var selectedTaskValue = null
var selectedSamplesValue = null

function changeFunc() {
		var selectTask = document.getElementById("task");
		temp = selectTask.options[selectTask.selectedIndex].value;
		
		if (temp !== ""){
			selectedTaskValue = temp 
		}

		var selectSamples = document.getElementById("samples");
		temp = selectSamples.options[selectSamples.selectedIndex].value;
		
		if (temp !== ""){
			selectedSamplesValue = temp
		}

		var answer = document.getElementById("answer");
		var dwnld = document.getElementById("dwnld");
		var dwnld_pkl = document.getElementById("dwnld_pkl");
		var dwnld_csv = document.getElementById("dwnld_csv");
		var info = document.getElementById("info");
		var tooltip = new bootstrap.Tooltip(info, {"placement":"right", })

		if (selectedSamplesValue !== null && selectedTaskValue !== null){

			if (table[selectedTaskValue][parseInt(selectedSamplesValue)] !== 768){
				answer.innerHTML = "We recommend<sup><a href='#Footnotes'>1</a></sup> reducing Roberta base embeddings from 768 dimensions to " + table[selectedTaskValue][parseInt(selectedSamplesValue)].toString() + "."
			}
			else {
				answer.innerHTML = "We recommend using the Roberta base embeddings as is."
			}
			
			if (links[selectedTaskValue][parseInt(selectedSamplesValue)][0] === ""){
				dwnld.hidden= true
				dwnld_pkl.hidden = true
				dwnld_csv.hidden = true
				dwnld_pkl.href = "#"
				dwnld_csv.href = "#"				
				info.hidden = true
			}
			else{
				dwnld.hidden = false
				dwnld_pkl.hidden = false
				dwnld_csv.hidden = false
				dwnld_pkl.href = models_base_url + links[selectedTaskValue][parseInt(selectedSamplesValue)][0]
				dwnld_csv.href = models_base_url + links[selectedTaskValue][parseInt(selectedSamplesValue)][1]
				info.hidden = false
			}
		}
}
