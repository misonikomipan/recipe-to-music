
#make <コマンド名>で実行できる ex) build: を実行したい場合 make build
#docker desktopアプリを立ち上げた状態でmake upと入力すると環境構築が完了します　(上手くいかない場合はディレクトリの位置にmakefileがあることを確認して)
#makeコマンドを使わなくてもコマンドをコピペすれば稼働します

#コンテナを起動する
up:
	docker-compose up -d
#コンテナを落とす
down:
	docker-compose down
#python環境に入る
py-exec:
	docker exec -it python-api bash
#コンテナから抜ける時はexitコマンド

#react環境に入る
re-exec:
	docker exec -it react-front bash

#reactに新しいライブラリをインストールする
#(1)docker-compose.base.ymlのinstaller -> command欄にライブラリを記入する
#(2)make react-install
#(3)meke clear-react-volume
#(4)docker-compose build --no-cache
react-install:
	docker-compose -f docker-compose.base.yml run --rm installer
clear-react-volume:
	docker volume rm react-front_node-modules-volume

#pythonのライブラリインストール後、docker-compose build --no-cacheを実行してください