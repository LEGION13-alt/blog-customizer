import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false); //состояние откр/закр

	//стили
	const defaultStateForm = useRef<ArticleStateType>(defaultArticleState);

	const [fontFamily, setFontFamily] = useState(
		defaultStateForm.current.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(
		defaultStateForm.current.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultStateForm.current.backgroundColor
	);
	const [fontColor, setFontColor] = useState(
		defaultStateForm.current.fontColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultStateForm.current.contentWidth
	);

	const refDiv = useRef<HTMLDivElement | null>(null);

	const toggleForm = () => {
		//закрыть/открыть форму
		setIsFormOpen((prev) => !prev);
	};

	// Обработчик клика оверлей
	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: refDiv,
		onClose: toggleForm,
		onChange: (newState) => setIsFormOpen(newState),
	});

	//применить форму
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
		toggleForm();
	};

	//сброс до дефолтных настроек
	const handleReset = () => {
		setArticleState(defaultStateForm.current);

		setFontFamily(defaultStateForm.current.fontFamilyOption);
		setFontSize(defaultStateForm.current.fontSizeOption);
		setBackgroundColor(defaultStateForm.current.backgroundColor);
		setFontColor(defaultStateForm.current.fontColor);
		setContentWidth(defaultStateForm.current.contentWidth);
		toggleForm();
	};

	return (
		<div ref={refDiv}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='font-size'
						selected={fontSize}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
