import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import { CSSProperties, useState } from 'react';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [defaultStateForm, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': defaultStateForm.fontFamilyOption.value,
					'--font-size': defaultStateForm.fontSizeOption.value,
					'--font-color': defaultStateForm.fontColor.value,
					'--container-width': defaultStateForm.contentWidth.value,
					'--bg-color': defaultStateForm.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
