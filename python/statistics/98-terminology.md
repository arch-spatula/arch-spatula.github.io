---
tags:
  [
    'Easter Egg',
    'hidden page',
    'index page',
    'Python',
    'statistics',
    'terminology',
  ]
description: '통계학 관련된 이런저런 용어를 다룹니다.'
sidebar_position: 98
toc_max_heading_level: 6
---

# 통계학 관련 용어

<!-- https://www.notion.so/ee3641475dc148b5b7e1a9e890018093?v=a46482969fad49518a9e853702dbab19 -->

## 기댓값(期待値, expected value)

발생할 가장 가능성이 높거나 그 인접한 값이다.

평균이랑 비슷한데 가능한 값마다 확률에 가중평균을 구하는 것이다. $E(x)$로 표현한다.

$$
\begin{array}{c:c}
X & x_{\footnotesize{1}} & x_{\footnotesize{2}} & x_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}} \\ \hline
P(x) & p_{\footnotesize{1}} & p_{\footnotesize{2}} & p_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}}  \\
\end {array}
$$

$x$값이 나올 확률 $P(x)$확률 함수나온다.

$$
E(x) = \displaystyle\sum_{i=1}^{n} x_{\footnotesize{i}}\cdot p_{\footnotesize{i}}
$$

```python
def calc_Expectation(a, n):
    '''
    기댓값을 구하는 함수
    '''
    if len(a) == len(n):
        times = len(n)
        sum = 0
        for i in range(0, times):
            sum += a[i] * n[i]

        return float(sum)
    else:
        print('배열 개수 안 맞음 ㅅㄱ')

n = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]
a = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]
expect = calc_Expectation(a, n)
print(expect)
```

## 대표값(representative value)

평균, 중앙값, 최빈값, 백분위수, 사분위수, 절사평균

## 평균

일상생활에서 평균은 산술평균 1가지를 의미합니다. 하지만 데이터 직군에서 일하려면 평균이 산술평균인지 정확히 말해야 합니다. 평균의 종류가 다양합니다.

일상 생활에서 조심할 것들이 있습니다. 회사에서 현금이라고 말하면 회계상 현금으로 분류된 자산을 의미하는지 지폐를 의미하는지 다릅니다. 이런것처럼 평균이라는 용어를 사용할 때 정확히 사용해야 합니다.

#### 산술평균(mean)

<!-- - 통계학은 가설검증에서 발생할 수 있는 **오류는 2가지**이다. 모집단의 표본을 보고 본래 모집단을 추정하고 검토하는데 표집단을 대변할 수 없는데 대변한다고 볼 수 있는 오류
  - **제1종 오류**는 귀무가설이 참인데 기각하는 것
    - 사회과학은 제1종오류를 중요하게 본다. 더 큰 비용을 발생시키기 때문이다.
      - 유의수준 알파($\alpha$)라고 한다. 0.01~0.1로 허용한다.
  - **제 2종오류**는 귀무가설이 거짓인데 채택하는 오류 -->

$$
E(\overline{x}) = \frac{\overset{N}{\underset{i = 1}{\sum}}x_{i}}{N} \\
\text{평균} = \overline{x} = \frac{\overset{N}{\underset{i = 1}{\sum}}x_{i}}{N}
$$

```py
mu = sum(x1, x2, x3, ..., xn) . 1/n
```

```py
from scipy.stats import describe
describe([0, 1]).mean
```

#### 절사평균

$$
\text{절사평균} = \bar{x} = \frac{\overset{n-p}{\underset{i = p+1}{\sum}} x_{i}}{n-2p}
$$

#### 가중평균

$$
\text{가중평균} = \bar{x} = \frac{\overset{n}{\underset{i = 1}{\sum}} w_{i}x_{i}}{\overset{n}{\underset{i = 1}{\sum}} w_{i}}
$$

#### 기하평균(geometric mean)

재무학 분야에서 장기재무계획에 사용하는 평균이다.

$$
G = \sqrt[n]{\prod_{i=1}^n x_i}
$$

#### 조화평균(harmonic mean)

역수의 산술평균의 역수

$$
H = \frac{1}{\frac{(\overset{n}{\underset{i = 1}{\sum}}\frac{1}{a_{i}})}{n}}
$$

### 중간값([中央-], 중위수, Median)

어떤 주어진 값들을 크기의 순서대로 정렬했을 때 가장 중앙에 위치하는 값을 의미합니다.

홀수의 경우 중간에 위치하는 값입니다.

짝수의 경우 중간에 있는 짝의 평균이다.

가중 중간값도 존재합니다.

중간값은 평균의 함정을 피할 수 있게 경제학에서 빈부격차를 추론할 때 유용합니다. 빈부격차가 극단적으로 커서 평균이 높아지는 현상을 볼 수 있습니다. 이렇게 되면 대부분 평범한 사람의 생활수준을 파악하기 어렵습니다. 이런 맥락에서 중간값을 더 신뢰할 수 있을 것입니다.

## 탐색적 데이터 분석(EDA, Exploratory Data Analysis)

## 추론(Inference)

통계학에서 추론이란 표본을 가지고 모집단에 대한 결론을 도출하는 일련의 복잡한 과정이다.

고전 통계학의 영역은 추론 통계학이 대부분이다.

## 베이즈 정리

$$
P(H|E) = \frac{P(E|H)P(H)}{P(E)}
$$

## 베르누이 분포

$$
\text{the Bernoulli Distribution} \\

\text{Bern}(x;\mu) =
\begin{cases}
\mu   & \text{if }x=1, \\
1-\mu & \text{if }x=0
\end{cases}
\\
\text{Bern}(x, \mu) = \mu^{x} \cdot (1 - \mu)^{1-x}
$$

## 의사결정 오류: 1종 오류와 2종 오류

- 통계적 의사결정 오류:
  - 제 1종 오류: 귀무가설이 거짓인데 채택하는 것.
  - 제 2종 오류: 귀무가설이 참인데 기각하는 것.

1종 오류를 더 조심해야 합니다. 예를 들어, 안전한 자동차를 보고 안 안전해서 다시 만드는 경우는 2종 오류를 범한 것입니다. 이 때 발생할 수 있는 피해는 잘 돌아는 자동차 시제품 1개입니다. 하지만 위험한 자동차를 보고 안전하다고 하면 1종 오류를 범한 것입니다. 이때 발생할 수 있는 손실의 규모는 더 큽니다. 운이 좋으면 판매량 만큼 리콜하고 배상하는 비용 운이 나쁘면 손해배상청구 소송 비용과 패소에 따라 발생할 수 있는 피해보상금까지 발생할 수 있습니다.

## t-테스트

표본을 많이 확보할 수 없는 상황에 진행하는 분석이다.

당연히 표본이 적은 만큼 정확성은 비교적 떨어진다.

Test Statistics: Crash Course Statistics #26

https://www.youtube.com/watch?v=QZ7kgmhdIwA

variation can make it tricky to tell when there are true differences or if it’s just random.

These situations seem pretty different, but when we get down to it, they share a similar
pattern. There’s actually one idea, which--with a few tweaks--can help us answer ALL of our “is it random...or is it real” questions.

That’s what test statistics do. Test statistics allow us to quantify how close things are
to our expectations or theories. Something that’s not always easy for us to do based
on our gut feelings. And test statistics allow us to add a little more mathematical rigor
to the process, so that we can make decisions about these questions.

$$
z = \frac{x-\mu}{\sigma}
$$

Z-scores

z-scores helped us understand the idea that differences are relative.

The amount of variance in a group is really important in judging a difference.

That’s why test statistics look at the difference between data and what we’d expect to see if the null hypothesis is true. But they also include some very important context: a measure of “average” variation we’d expect to see

$$
\text{실험 통계}: \frac{\text{관측값}-\text{영가설이 참일 때 값}}{V(x)}
$$

sampling distribution which is the distribution of all possible group means for a certain sample size.

$$
Z_{실험집단} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
$$

So, the z-score--also called the z-statistic--tells us how many standard errors away from the sampling distribution mean our group mean is.

Z-statistics around 1 or -1 tell us that the sample mean is the typical distance we’d
expect a typical sample mean to be from the mean of the null hypothesis.

Z-statistics that are a lot bigger in magnitude than 1 or -1 mean that this sample mean is
more extreme. Which matches the general form of a test statistic.

The p-value will tell us how rare or extreme our data is so that we can figure out whether we think there’s an effect.

Historically we’ve done this with tables, but most statistical programs, even Excel, can calculate this. We can use z-tests to do hypothesis tests about means, differences between means, proportions, or even differences between proportions.

The first way is to calculate a “critical” value. A critical value is a value of our
test statistic that marks the limits of our “extreme” values. A test statistic that
is more extreme than these critical values (that is it’s towards the tails) causes
us to reject the null .

We calculate our critical value by finding out which test-statistic value corresponds
to the top 0.5, 1, or 5% most extreme values. For a z-test with alpha = 0.05, the critical
values are 1.96 and -1.96.

If your z-statistic is more extreme than the critical value, you call it “statistically significant”

But sometimes, a z-test won’t apply. And when that happens, we can use the t-distribution and corresponding t-statistic to conduct a hypothesis test. The t-test is just like our z-test. It uses the same general formula for its t-statistic. But we use a t-test if we don't know the true population standard deviation.

$$
T-statistic = \frac{\bar{X} - \mu}{\frac{sd}{\sqrt{n}}}
$$

The t-distribution looks like the z-distribution, but with thicker tails. The tails are thicker
because we're estimating the true population standard deviation. Estimation adds a little more uncertainty ...which means thicker tails, since extreme values are a little more common. But as we get more and more data, the t-distribution converges to the z-distribution, so with really large samples, the z and t-tests should give us similar p-values.

![스크린샷 2021-12-08 오후 8.20.02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef110a5e-ad7b-41b3-815d-a606f43d48dc/스크린샷_2021-12-08_오후_8.20.02.png)

If we’re ever in a situation where we had the population standard deviation, a z-test
is the way to go. But a t-test is useful when we don’t have that information.

Before we do our test, we need to decide on an alpha level. We set our alpha at 0.01,
because we want to be a bit more cautious about rejecting the null hypothesis than we
would be if we used the standard of 0.05.

$$
H_{\alpha}: \mu_{1} - \mu_{2} = 0 \\
H_{\alpha}: \mu_{1} - \mu_{2} \neq 0
$$

The two sample t-statistic again follows the general form.

whether something was significant: critical values and p-values.
These two methods are equivalent. Large test statistics and small p-values both refer to
samples that are extreme. A test statistic that’s bigger than our
critical value would allow us to reject the null hypothesis. And any test-statistic that’s
larger than the critical value will have a p-value less than 0.05. So, the two methods
will lead us to the same conclusion.

If you have trouble remembering it, this rhyme may help: “Reject H-Oh if the p is too low” These two methods are equivalent. But we often use p-values instead of critical values. This is because each test-statistic, like the z or t statistics, have different critical values, but a p-value of less than 0.05 means that your sample is in the top 5% of extreme samples no matter if you use a z or t test-statistic - or some of the other test-statistic we haven’t discussed like F or chi-square.

Test statistics form the basis of how we can test if things are actually different or what
we seeing is just normal variation. They help us know how likely it is that our results
are normal, or if something interesting is going on.

T-Tests: A Matched Pair Made in Heaven: Crash Course Statistics #27

https://www.youtube.com/watch?v=AGh66ZPpOSQ

We can adapt the general formula...in all sorts of situations.

we have our hypotheses, we can do a t-test.

The formula for a two sample t-test follows our general test statistic formula.

For two groups, the standard error is calculated a bit differently since we have to account for the sample variance of two groups.

Now that we have our t-value, we can figure out if there’s a statistically significant difference

We can calculate the critical t-value and if our t-statistic is GREATER than the critical value we reject the null hypothesis.

Or we can calculate the p-value from our t-statistic and we can reject the null hypothesis if the

p-value is SMALLER than our chosen alpha level. To do either of these things, we’ll need to choose our alpha level.

To calculate our critical t-value we need to find the t-values which correspond to the
top 5% most extreme values in our t-distribution.

The critical value and p-value approach will give you identical results, so we don’t really need to do both.

One thing that’s nice about the p-value approach, and the reason we’ll mainly rely on it throughout the rest of these examples, is that p-values are easier for us non-computers to interpret.

But remember, absence of evidence is not evidence of absence.

But random assignment adds variation, which can make it harder to see a true difference. One solution to this issue is a paired t-test. The best match, of course, for a person is themselves. One way to do this, is to make a difference score for each person.

T-statistics tell you how many standard errors away from the mean our observed difference is.

Though the t-distribution isn’t EXACTLY normal, it’s reasonably close, so we can use our intuition about normal distributions to understand our t-values.

Normal distributions have about 68% of their data within one standard deviation from the mean. And about 95% within 2 standard deviations. That means that t-scores around 3.

Statistical tests help us wade through the murky waters of variability, and our goal should be to get rid of as MUCH of that variability as possible so that we can see patterns.

We’re just comparing what we see, to what we think we should see. We’re always comparing the way things are to how we expect them to be. And statistics is no exception. We now have the tools to design experiments and answer a lot of interesting questions and do our own experiments
