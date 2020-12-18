import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { DataTable } from "react-native-paper";

const History = ({ route, navigation }) => {
	const history = route.params.history;
	const [discountHistory, setDiscountHistory] = useState(history);

	const clearHandler = () => {
		Alert.alert(
			"Clear History",
			"Are you sure you want to clear history?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{ text: "OK", onPress: () => setDiscountHistory([]) },
			],
			{ cancelable: false }
		);
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{ margin: 18 }}>
					<Button
						title="Clear History"
						onPress={() => clearHandler()}
						color="#264866"
					/>
				</View>
			),
		});
	}, [discountHistory]);

	const deleteHandler = (id) => {
		setDiscountHistory(() =>
			discountHistory.filter((item) => {
				return item.id !== id;
			})
		);
	};

	return (
		<View>
			<Text
				style={{
					fontSize: 25,
					fontWeight: "bold",
					textAlign: "center",
					marginBottom: 15,
					marginTop: 20,
				}}
			>
				History
			</Text>
			{discountHistory && (
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Original Price</DataTable.Title>
						<DataTable.Title>Discount %</DataTable.Title>
						<DataTable.Title>Final Price</DataTable.Title>
						<DataTable.Title>Delete</DataTable.Title>
					</DataTable.Header>
					{discountHistory.map((item) => {
						const { id, originalPrice, discoutPercentage, total } = item;
						return (
							<DataTable.Row key={id}>
								<DataTable.Cell>{originalPrice}$</DataTable.Cell>
								<DataTable.Cell>{discoutPercentage}%</DataTable.Cell>
								<DataTable.Cell>{total}$</DataTable.Cell>
								<DataTable.Cell>
									<Button
										title="x"
										onPress={() => deleteHandler(id)}
										color="red"
									/>
								</DataTable.Cell>
							</DataTable.Row>
						);
					})}
				</DataTable>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	btnStyles: {
		width: 50,
		margin: "auto",
		marginTop: 10,
	},
});

export default History;
