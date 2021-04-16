---
layout: post
title:  "Empirical Evaluation of Pre-trained Transformers for Human-Level NLP: The Role of Sample Size and Dimensionality"
date:   2021-04-15 15:14:45 -0400
categories: paper
---

### TLDR;

| Number of training samples | Demographic Tasks | Personality Tasks | Mental Health Tasks |
| -------------------------- | :---------------: | :---------------: | :-----------------: |
| 50                         | 16                | 16                | 16                  |
| 100			     | 128		 | 16		     | 22		   |
| 200			     | 512		 | 32		     | 45		   |
| 500			     | 768		 | 64		     | 64		   |
| 1000			     | 768		 | 90 		     | 64		   |

This work is intended to inform researchers in Computational Social Science a simple way to improve the performance of transformer based models. We find that training PCA on transformer representations using the domain data improves the model performance overall, with evidence of handling longer sequences better than other reduction methods.
The table above presents a summary of systematic experiments, recommmending the number of dimensions required for given number of samples in each task domain to achieve the best performance.

### What are Human-Level NLP tasks?
Human-level NLP tasks, rooted in computational social science, focus on making predictions about people from their language use patterns. Examples of these tasks include demographic prediction, personality trait prediction and mental health related tasks. These tasks aim to udnerstand the language not just merely based on the words and what they mean, but the context (history) in which they occur and the person behind it. 

### What are the challenges and limitations of using transformers in these tasks?
Transformers are pre-trained at document level and are hence only readily usable for document- and word-level tasks. We also find that fine-tuning transformers (without making significant architectural changes) for these tasks doesn't improve its performance. 
In low sample setting, such as human-level tasks, these models contain more dimensions than necessary.

### Why are these tasks important?
These tasks present a challenge in modeling, as the samples from a person are composed of incoherent subject matters (posts) with a few high signal messages amidst the noise. Some of the human-level tasks are unique in not having a single ground truth but a set of accepted outcomes - making it challenging to interpret metrics like accuracy.
Hence these tasks provide an alternative evaluation of the semantics captured by the standard LMs, i.e., understanding the person behind the text rather than assuming a single view of what the text expresses. This also suggests that the many dimensions of transformers containing syntax and semantics of text may be less useful. It is also important to note that fewer features are easier to generalize the model.

### How do we improve the performance of transformers in these tasks?
It is very simple, yet effective. Training PCA to reduce the dimensions of the transformer on the domain data improves the performance over these pre-trained representations. The number of dimensions required to obtain the best performance is summarized in the table above for each domain of tasks. We find that many human-level tasks only require 1/6th or 1/12th of the hidden dimensions to achieve best performance.

### Why PCA?
Amongst the standard reduction methods based on SVD, we find that PCA and NMF produce consistently better performance over the rest. We also find that PCA is better than NMF in handling longer sequences of texts, which is depicted in the figure below.
<p align="center">
	<img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg.png" style="width: 45%">
	<img src="{{ site.url }}/blog/assets/ConEmbDR/RPCA_NMFdeltaErrorAvg1gramsPerMsg_ext.png" style="width: 45%">
</p>

You can cite our work with:
	
	@article{vganesan2021empirical,
	title={Empirical Evaluation of Pre-trained Transformers for Human-Level NLP: The Role of Sample Size and Dimensionality},
	author={V Ganesan, Adithya and Matero, Matthew and Ravula, Aravind Reddy and Vu, Huy and Schwartz, H. Andrew},
	year={2021},
	booktitle={Under Review.}
	}
