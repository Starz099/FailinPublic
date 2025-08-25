import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fip" is now active!');

	const disposable = vscode.commands.registerCommand('fip.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from fip!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}