import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
	const [originalPrice, setOriginalPrice] = useState("");
	const [discoutPercentage, setDiscountPercentage] = useState("");
	const [total, setTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [history, setHistory] = useState([]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					title="History"
					onPress={() =>
						navigation.navigate("History", {
							history,
						})
					}
				/>
			),
		});
	}, [navigation, history]);

	const priceHandler = (e) => {
		e.preventDefault();
		if (e.target.value >= 0) {
			setOriginalPrice(e.target.value);
		}
	};

	const discountHandler = (e) => {
		e.preventDefault();
		if (e.target.value >= 0 && e.target.value <= 100) {
			setDiscountPercentage(e.target.value);
		}
	};

	useEffect(() => {
		let totalPrice =
			originalPrice - originalPrice * (discoutPercentage / 100);
		setTotal(totalPrice.toFixed(2));

		let totalDiscount = originalPrice * (discoutPercentage / 100);
		setDiscount(totalDiscount.toFixed(2));
	}, [originalPrice, discoutPercentage]);

	const saveHandler = () => {
		var newData = {
			id: Math.floor(Math.random() * 100000),
			originalPrice,
			discoutPercentage,
			total,
		};
		setHistory((history) => [...history, newData]);
		setOriginalPrice("");
		setDiscountPercentage("");
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerStyles}>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					Calculate Discount
				</Text>
			</View>
			<TextInput
				style={[styles.inputStyles, { marginTop: 20 }]}
				value={originalPrice}
				onChange={priceHandler}
				placeholder="Original Price"
			/>
			<TextInput
				style={[styles.inputStyles, { marginTop: 5 }]}
				value={discoutPercentage}
				onChange={discountHandler}
				placeholder="Discount %"
			/>
			<View style={styles.discountStyles}>
				<Text style={styles.pricingStyles}>You save: {discount}$ </Text>
				<Text style={styles.pricingStyles}>Final Price: {total}$</Text>
			</View>
			<Text>
				{originalPrice && discoutPercentage && (
					<View style={styles.calculateStyles}>
						<Button title="save" onPress={saveHandler} />
					</View>
				)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		textAlign: "center",
	},
	headerStyles: {
		textAlign: "center",
		padding: 5,
		marginTop: 20,
		color: "#fff",
	},
	inputStyles: {
		borderWidth: 1,
		borderColor: "grey",
		width: "50%",
		padding: 5,
		margin: "auto",
		borderRadius: 5,
	},
	discountStyles: {
		textAlign: "center",
		marginTop: 10,
	},
	pricingStyles: {
		fontWeight: "bold",
		fontSize: 15,
	},
	calculateStyles: {
		width: "30%",
		margin: "auto",
		marginTop: 10,
	},
});

export default HomeScreen;
