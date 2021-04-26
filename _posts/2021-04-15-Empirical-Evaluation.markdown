---
layout: post
title:  "Empirical Evaluation of Pre-trained Transformers for Human-Level NLP: The Role of Sample Size and Dimensionality"
date:   2021-04-15 15:14:45 -0400
categories: paper
script: /assets/ConEmbDR/empirical-eval.js
---

### TLDR: How many transformer dimensions are required for your task?

<div class="row" align="center">
<div class="col-sm" style="margin: 2%">
<select id="task" class="custom-select custom-select-lg mb-3" onchange="changeFunc();">
<option value="" selected disabled hidden>Choose Most Similar Task</option>
<option value="demographics">Demographics</option>
<option value="personality">Personality</option>
<option value="mental health">Mental Health</option>
</select>
</div>
<div class="col-sm" style="margin: 2%">
<select id="samples" class="custom-select custom-select-lg mb-3 col-sm" onchange="changeFunc();">
<option value="" selected disabled hidden>Choose Train Sample Size</option>
<option value="50">50</option>
<option value="100">100</option>
<option value="200">200</option>
<option value="500">500</option>
<option value="1000">1000</option>
</select>
</div>
</div>

<div id="answer" align="center" style="font-size:large; color:rgb(140, 20, 20) "></div>

<div id="dwnld" align="center" style="margin-top: 2%" hidden>
Download<sup><a href="#Footnotes">2</a></sup> pre-trained reduction model as:
<a href="#" id="dwnld_pkl" hidden download><button type="button" class="btn btn-outline-info">Pickle File</button></a>
<a href="#" id="dwnld_csv" hidden download><button type="button" class="btn btn-outline-info">CSV</button></a>
<a href="https://github.com/adithya8/ContextualEmbeddingDR/tree/master/models#model-usage" id="info" hidden data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click to view the code snippet for using this model."><i><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/></svg></i></a>
</div>

<hr>

This work is intended to inform researchers in Computational Social Science a simple way to improve the performance of transformer based models. We find that training PCA on transformer representations using the domain data improves the model performance overall, with evidence of handling longer sequences better than other reduction methods.
Use the above lookup to get the recommmended number of dimensions required for given number of samples in each task domain to achieve the best performance.

### How to improve the performance of contextual embeddings in low sample settings?
It is very simple, yet effective. Training PCA to reduce the dimensions of the transformer on the domain data improves the performance over these pre-trained representations. The number of dimensions required to obtain the best performance is summarized in the table below. We find that many  of these tasks only require 1/6th or 1/12th of the hidden dimensions to achieve best performance.

| Number of training samples | Demographic Tasks | Personality Tasks | Mental Health Tasks |
| -------------------------- | :---------------: | :---------------: | :-----------------: |
| 50                         | 16                | 16                | 16                  |
| 100			     | 128		 | 16		     | 22		   |
| 200			     | 512		 | 32		     | 45		   |
| 500			     | 768		 | 64		     | 64		   |
| 1000			     | 768		 | 90		     | 64		   |


### What are Human-Level NLP tasks?
Human-level NLP tasks, rooted in computational social science, focus on making predictions about people from their language use patterns. Examples of these tasks include demographic prediction, personality trait prediction and mental health related tasks. These tasks aim to understand the language not just merely based on the words and what they mean, but the context (history) in which they occur and the person behind it. 

### What are the challenges and limitations of using transformers in these tasks?
Transformers are pre-trained at document level and are hence only readily usable for document- and word-level tasks. We find that fine-tuning transformers (without making significant architectural changes) for these tasks doesn't improve its performance. 
In low sample setting, such as human-level tasks, these models contain more dimensions than necessary.

### Why are these tasks important?
These tasks present a challenge in modeling, as the samples from a person are composed of less coherent subject matters (posts) with limited high signal messages amidst the noise. Some of the human-level tasks are unique in not having a single ground truth but a set of accepted outcomes - making it challenging to interpret metrics like accuracy.

Hence these tasks provide an alternative evaluation of the semantics captured by the standard LMs, i.e., understanding the person behind the text rather than assuming a single view of what the text expresses. This also suggests that the many dimensions of transformers containing syntax and semantics of text may be less useful. It is also important to note that fewer features are easier to generalize the model.

### Which transformer model is suited for these tasks?
Most of these tasks are based on social media language. Hence a model fine-tuned to the social media domain would work the best. However, amongst the popularly used pre-trained models, we find roberta to offer the best performance in these tasks.

### Which reduction method is preferable?
Amongst the standard reduction methods based on SVD, we find that PCA and NMF produce consistently better performance over the rest. We also find that PCA is better than NMF in handling longer sequences of texts, which is depicted in the figure below.
<p align="center">
 <img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg.png" style="width: 45%">
 <img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg_ext.png" style="width: 45%">
</p>

You can cite our work with:
	
	@inproceedings{vganesan2021empirical,
	title="Empirical Evaluation of Pre-trained Transformers for Human-Level NLP: The Role of Sample Size and Dimensionality",
	author="V Ganesan, Adithya 
	   and Matero, Matthew 
	   and Ravula, Aravind Reddy 
	   and Vu, Huy 
	   and Schwartz, H. Andrew"
	booktitle = "Proceedings of the 2021 Conference of the North {A}merican Chapter of the Association for Computational Linguistics: Human Language Technologies",
	year = "2021",
	publisher = "Association for Computational Linguistics",
	}

---

#### Footnotes
<div id="Footnotes">
<sup>1</sup> The recommended dimensions were arrived by taking the median of the best performing number of dimensions across various tasks. Hence the model provided in the download link will be the least number of dimensions greater than or equal to the recommended dimensions.
<br><br>
<sup>2</sup> Learn more about the pre-trained reduction models<a href="https://github.com/adithya8/ContextualEmbeddingDR/tree/master/models#model-usage"> here</a>.
</div>
