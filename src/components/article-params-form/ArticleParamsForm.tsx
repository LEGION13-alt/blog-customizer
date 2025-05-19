import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Spacing } from 'src/ui/spacing';

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
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false); //состояние откр/закр

	//стили
	const defaultStateForm = defaultArticleState;
	const refDiv = useRef<HTMLDivElement | null>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

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

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	//применить форму
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		toggleForm();
	};

	//сброс до дефолтных настроек
	const handleReset = () => {
		setArticleState(defaultStateForm);
		setFormState(defaultArticleState);
		toggleForm();
	};

	return (
		<div ref={refDiv}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />

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
					<Spacing />
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<Spacing />
					<RadioGroup
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Spacing />
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleOnChange('fontColor')}
					/>
					<Spacing />
					<Separator />
					<Spacing />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleOnChange('backgroundColor')}
					/>
					<Spacing />
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleOnChange('contentWidth')}
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
