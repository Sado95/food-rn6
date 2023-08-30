import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import useResults from "../hooks/useResults";

/* COMPONENT IMPORT */

import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={styles.background}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          title="Cost Effective"
          results={filterResultsByPrice("$")}
        />

        <ResultsList title="Bit Pricier" results={filterResultsByPrice("$$")} />

        <ResultsList
          title="Big Spender"
          results={filterResultsByPrice("$$$")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default SearchScreen;
