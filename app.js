var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Function to toggle node visibility
function toggleNode(nodeElement) {
    var ul = nodeElement.querySelector("ul");
    if (ul) {
        ul.style.display = ul.style.display === "none" ? "block" : "none";
    }
}
// Function to recursively make all parent nodes visible
function makeParentsVisible(nodeElement) {
    if ((nodeElement === null || nodeElement === void 0 ? void 0 : nodeElement.tagName) === "LI") {
        var parentUl = nodeElement.parentElement; // Parent UL
        var parentLi = parentUl === null || parentUl === void 0 ? void 0 : parentUl.parentElement; // Parent LI
        if (parentUl && parentUl.tagName === "UL") {
            parentUl.style.display = "block"; // Make the parent UL visible
        }
        if (parentLi && parentLi.tagName === "LI") {
            makeParentsVisible(parentLi); // Recursively make parent LI visible
        }
    }
}
// Function to render the main Tree
function renderTree(container, data) {
    return __awaiter(this, void 0, void 0, function () {
        function createTreeNode(node) {
            var li = document.createElement("li");
            li.classList.add("tree-item");
            // Create an icon
            var icon = document.createElement("span");
            icon.classList.add("icon");
            icon.textContent = node.type === "directory" ? "📂" : "📄";
            // Create a label
            var label = document.createElement("span");
            label.classList.add("label");
            label.textContent = node.name;
            li.appendChild(icon);
            li.appendChild(label);
            // Attach data to the element for reference
            li.dataset.nodeInfo = JSON.stringify(node);
            if (node.type === "directory" && node.children) {
                var ul_1 = document.createElement("ul");
                ul_1.style.display = "none"; // Hidden by default
                node.children.forEach(function (child) {
                    ul_1.appendChild(createTreeNode(child));
                });
                li.appendChild(ul_1);
                // Attach the toggle functionality
                li.addEventListener("click", function (event) {
                    event.stopPropagation();
                    toggleNode(li);
                    console.log("Clicked Node:", JSON.parse(li.dataset.nodeInfo || "{}"));
                });
            }
            else {
                // Add click listener for file nodes
                li.addEventListener("click", function (event) {
                    event.stopPropagation();
                    console.log("Clicked Node:", JSON.parse(li.dataset.nodeInfo || "{}"));
                });
            }
            return li;
        }
        var ul;
        return __generator(this, function (_a) {
            ul = document.createElement("ul");
            ul.classList.add("tree");
            ul.appendChild(createTreeNode(data));
            container.innerHTML = ""; // Clear existing content
            container.appendChild(ul);
            return [2 /*return*/];
        });
    });
}
// Function to search the tree for matching nodes
// function searchTree(node: TreeNode, searchTerm: string | undefined) {
//   if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//     return node;
//   }
//   if (node.children) {
//     const filteredChildren = node.children
//       .map((child) => searchTree(child, searchTerm))
//       .filter((child) => child !== null);
//     if (filteredChildren.length > 0) {
//       return { ...node, children: filteredChildren };
//     }
//   }
//   return null;
// }
// Fetch JSON data
// async function fetchData() {
//   const container = document.getElementById("tree-container");
//   const searchBar = document.getElementById("search-text");
//   const searchButton = document.getElementById("search-btn");
//   if (container) {
//     const response = await fetch("data.json");
//     const jsonData = await response.json();
//     // Render the initial tree
//     renderTree(container, jsonData.root);
//     // Add search functionality
//     searchButton?.addEventListener("click", () => {
//       const searchTerm = searchBar?.value?.trim();
//       // console.log(searchTerm);
//       // Perform the search
//       const filteredTree = searchTree(jsonData.root, searchTerm);
//       if (filteredTree) {
//         console.log(filteredTree.children);
//         renderTree(container, filteredTree); // Render the filtered tree
//         // Highlight and expand the matching nodes
//         const allNodes = container.querySelectorAll("li.tree-item");
//         allNodes.forEach((node) => {
//           const nodeData = JSON.parse(node.dataset.nodeInfo || "{}");
//           if (nodeData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//             node.scrollIntoView({ behavior: "smooth", block: "center" });
//             makeParentsVisible(node as HTMLElement); // Ensure all parents are visible
//           }
//         });
//       } else {
//         container.innerHTML = "<p>No matches found</p>"; // Show no results message
//       }
//     });
//   }
// }
// Fuzzy search function
function fuzzyMatch(input, target) {
    input = input.toLowerCase();
    target = target.toLowerCase();
    var i = 0, j = 0;
    while (i < input.length && j < target.length) {
        if (input[i] === target[j]) {
            i++;
        }
        j++;
    }
    return i === input.length; // True if all characters in input match in order
}
// Function to search the tree with fuzzy matching
function searchTreeFuzzy(node, searchTerm) {
    if (fuzzyMatch(searchTerm, node.name)) {
        return node;
    }
    if (node.children) {
        var filteredChildren = node.children
            .map(function (child) { return searchTreeFuzzy(child, searchTerm); })
            .filter(function (child) { return child !== null; });
        if (filteredChildren.length > 0) {
            return __assign(__assign({}, node), { children: filteredChildren });
        }
    }
    return null;
}
// Fetch JSON data
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var container, searchBar, searchButton, response, jsonData_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.getElementById("tree-container");
                    searchBar = document.getElementById("search-text");
                    searchButton = document.getElementById("search-btn");
                    if (!container) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("data.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonData_1 = _a.sent();
                    // Render the initial tree
                    renderTree(container, jsonData_1.root);
                    // Add search functionality
                    searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", function () {
                        var _a;
                        var searchTerm = (_a = searchBar === null || searchBar === void 0 ? void 0 : searchBar.value) === null || _a === void 0 ? void 0 : _a.trim();
                        // console.log(searchTerm);
                        // Perform the fuzzy search
                        var filteredTree = searchTreeFuzzy(jsonData_1.root, searchTerm);
                        if (filteredTree) {
                            console.log(filteredTree.children);
                            renderTree(container, filteredTree); // Render the filtered tree
                            // Highlight and expand the matching nodes
                            var allNodes = container.querySelectorAll("li.tree-item");
                            allNodes.forEach(function (node) {
                                var nodeData = JSON.parse(node.dataset.nodeInfo || "{}");
                                if (fuzzyMatch(searchTerm, nodeData.name)) {
                                    node.scrollIntoView({ behavior: "smooth", block: "center" });
                                    makeParentsVisible(node); // Ensure all parents are visible
                                }
                            });
                        }
                        else {
                            container.innerHTML = "<p>No matches found</p>"; // Show no results message
                        }
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
fetchData();
