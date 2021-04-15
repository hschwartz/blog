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

This work is intended to inform researchers in Computational Social Science a simple way to improve the performance of transformer based models. We find that training PCA on transformer representations using the domain data helps the model performance overall with evidence of handling longer sequences better.
The table below presents a summary of systematic experiments, answering the number of dimensions required for given number of samples in each task domain.

### What are Human-Level NLP tasks?
Human-level NLP tasks, rooted in computational social science, focus on making predictions about people from their language use patterns. Examples of these tasks include demographic prediction, personality trait prediction and mental health related tasks.

### Why are these tasks important?
These tasks present a challenge in modeling, as the samples from a person are composed of incoherent subject matters (posts) with a few high signal messages amidst the noise. Some of the human-level tasks are unique in not having a single ground truth but a set of accepted outcomes - making it challenging to interpret metrics like accuracy.
Hence these tasks provide an alternative evaluation of the semantics captured by the standard LMs, as in understanding the person behind the text rather than assuming a single view of what the text expresses. This also suggests that the many dimensions of transformers containing syntax and semantics of text may be less useful. It is also important to note that fewer features are easier to generalize the model.

### What limits the performance of transformers in these tasks?


### How do we improve the performance of transformers in these tasks?


You can cite our work with:
	
	@article{vganesan2021empirical,
	title={Empirical Evaluation of Pre-trained Transformers for Human-Level NLP: The Role of Sample Size and Dimensionality},
	author={V Ganesan, Adithya and Matero, Matthew and Ravula, Aravind Reddy and Vu, Huy and Schwartz, H. Andrew},
	year={2021},
	booktitle={Under Review.}
	}
