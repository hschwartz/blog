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
<option value="2000">2000</option>
<option value="5000">5000</option>
<option value="10000">10000</option>
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

*Working on human-level NLP and looking for a simple way to effectively improve transformer-based approaches?* We've empirically investigated and found some useful optoins: We first find that fine-tuning large models with a limited amount of data pose a significant difficulty which can be overcome with a pre-trained dimension reduction regime. RoBERTa consistently achieves top performance in human-level tasks, with PCA giving benefit over other reduction methods in better handling users that write longer texts. Often, task-specific models can achieve results comparable to the best performance with just 1/12 of the embedding dimensions.
**Use the form above to download our recommended RoBERTA dimensionality reduction given your (a) number of training samples, and (b) task domain.**

### How to improve the performance of contextual embeddings in low sample settings?
It is very simple, yet effective. Training PCA to reduce the dimensions of the transformer on *unlabeled* domain data improves the performance over pre-trained representations (or fine-tuning to the task). Results from a thoroughy investigation using bootstrapped sampling, demonstrate using such a transformation are typically produces accuracies in downstream tasks as good or significantly better than using the second-to-last layer or fine-tuning the transformer at the message-level. The code to do the dimensionality reduction (transformation matrix or [DLATK](github.com/dlatk/dlatk) picklefile) are available by selecting your situation's sample size and task domain above.

#### Key Links
 * [Paper from NACCL-2021](https://aclanthology.org/2021.naacl-main.357/)
 * [Code for Dimension Reduction of Contextual Embeddings](https://github.com/adithya8/ContextualEmbeddingDR)

### What are Human-Level NLP tasks?
Human-level NLP tasks, rooted in computational social science, focus on estimating characteristics about people from their language use patterns. Examples of these tasks include  personality trait prediction, mental health assessment, and demographic estimation. Using transformers for these tasks enables them to not only campture the words used but the semantics given the context in which they occur and the person behind it. *However, these tasks often only have training datasets numbering in the hundreds.*

### What are the challenges of using transformers in these tasks?
Transformer models yield representations of over 20,000 dimemensions! (i.e. 1024 hidden-state size by 24 layers). Even just using one layer often means the number of dimensions are larger than the number training examples (often numbering only a few hundred). Furhter, transformers are pre-trained at document level, and yet these tasks run over multiple docuents. In fact, we fine-tuning transformers (without making significant architectural changes) for these tasks results in worse performance than using them to just get pre-trained contextual embeddings of the data. The best models in shared tasks use something akin to the average document-level embeddings across all posts of a user (e.g. see CLPsych-2019 shared task).


### Why are these tasks important?
Natural language is human-generated. 
Understanding human attributes associated with language can enable applications that improve human life, such as producing better mental health assessments that could ultimately save lives.
Mental health conditions, such as depression, are widespread and many suffering from such conditions are under-served with only 13 - 49% receiving minimally adequate treatment (Kessler et al., 2003; Wang et al., 2005).
We believe this technology, when used in collaboration with mental health care professionals, offers the potential to broaden the coverage of mental health care to such populations where resources are currently limited. 

Further, for the advancement of NLP in general, these tasks present a challenge in modeling: The samples from a person are composed of a greater variety of subject matters (posts) with limited high signal messages amidst the noise. Some of the human-level tasks are unique in not having a single ground truth but a set of accepted outcomes - making it challenging to interpret metrics like accuracy.
Hence these tasks provide an alternative evaluation of the semantics captured by the standard LMs, i.e., understanding the person behind the text rather than assuming a single view of what the text expresses. Fewer features without loss of accuracy generally suggests greater generalization. 

### Which transformer model is suited for these tasks?
Most of these tasks are based on social media language. Hence a model fine-tuned to the social media domain would work the best. However, amongst the popularly used pre-trained models, we find **RoBERTA** to offer the best performance in these tasks.


### Which reduction method is preferable?
Amongst the reduction methods based on the techniques of non-linear autoencoders and Singular Value Decomposition (SVD), we find that PCA and Non-negative Matrix Factorization (NMF) produce consistently better performance over the rest. We also find that PCA is better than NMF in handling longer sequences of texts, which is depicted in the figure below.
<p align="center">
 <img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg.png" style="width: 40%">
 <img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg_ext.png" style="width: 40%">
</p>

### What are the full results on the ideal number of dimensions per task domain?
The number of dimensions required to obtain the best performance is summarized in the table below. We find that many  of these tasks only require 1/6th or 1/12th of the hidden dimensions to achieve best performance. 

| Number of training samples | Demographic Tasks | Personality Tasks | Mental Health Tasks |
| -------------------------- | :---------------: | :---------------: | :-----------------: |
| 50                         | 16                | 16                | 16                  |
| 100			     | 128		 | 16		     | 22		   |
| 200			     | 512		 | 32		     | 45		   |
| 500			     | 768		 | 64		     | 64		   |
| 1000			     | 768		 | 90		     | 64		   |
| 2000			     | 768		 | 90		     | 64		   |
| 5000			     | 768		 | 181		     | 64		   |
| 10000			     | 768		 | 181		     | 64		   |


### How to cite this:
	
	@inproceedings{v-ganesan-etal-2021-empirical,
	title = "Empirical Evaluation of Pre-trained Transformers for Human-Level {NLP}: The Role of Sample Size and Dimensionality",
	author = "V Ganesan, Adithya  and Matero, Matthew  and Ravula, Aravind Reddy  andVu, Huy  and Schwartz, H. Andrew",
	booktitle = "Proceedings of the 2021 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies",
	month = jun,
	year = "2021",
	address = "Bangkok, Thailand",
	publisher = "Association for Computational Linguistics",
	url = "aclanthology.org/2021.naacl-main.357/",
	pages = "4515--4532"}

---

#### Footnotes
<div id="Footnotes">
<sup>1</sup> The recommended dimensions were arrived by taking the median of the best performing number of dimensions across various tasks. Hence the model provided in the download link will be the least number of dimensions greater than or equal to the recommended dimensions.
<br><br>
<sup>2</sup> Learn more about the pre-trained reduction models<a href="https://github.com/adithya8/ContextualEmbeddingDR/tree/master/models#model-description"> here</a>.
</div>
